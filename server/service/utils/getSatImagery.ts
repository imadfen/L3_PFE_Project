import { TimeRange } from '../types/TimeRange';

type Options = {
    cloudCover?: number;
    width?: number;
    height?: number;
    fileName?: string;
}

export default async function getSatImagery(
    accessToken: string,
    bbox: number[],
    timeRange: TimeRange,
    options: Options
): Promise<Response | null> {
    const cloudCover = options.cloudCover || 10;
    const width = options.width || 2500;
    const height = options.height || 2500;
    const fileName = options.fileName || "default";

    const url = "https://services.sentinel-hub.com/api/v1/process";

    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`
    };

    const data = {
        "input": {
            "bounds": {
                "bbox": bbox
            },
            "data": [
                {
                    "dataFilter": {
                        "timeRange": {
                            "from": timeRange.from,
                            "to": timeRange.to
                        },
                        "maxCloudCoverage": cloudCover,
                        "mosaickingOrder": "mostRecent"
                    },
                    "processing": {
                        "upsampling": "BICUBIC",
                        "downsampling": "BICUBIC"
                    },
                    "type": "sentinel-2-l2a"
                }
            ]
        },
        "output": {
            "width": width,
            "height": height,
            "responses": [
                {
                    "identifier": fileName,
                    "format": {
                        "type": "image/png"
                    }
                },
            ]
        },
        "evalscript": `
      //VERSION=3

      function setup() {
        return {
          input: ['B02', 'B03', 'B04'],
          output: { id: '${fileName}', bands: 3 }
        };
      }

      function evaluatePixel(sample) {
        return [2.5 * sample.B04, 2.5 * sample.B03, 2.5 * sample.B02];
      }
    `
    };

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    });

    if (response.ok) {
        return response;
    } else {
        console.error(`Request failed with status code (${response.status}):\n${await response.text()}`);
        return null;
    }
}
