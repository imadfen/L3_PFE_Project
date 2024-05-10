import sharp from 'sharp';

export default async function prepareImage(buf: Buffer) {
    const img = sharp(buf);
    const md = await img.metadata();
    const [img_width,img_height] = [md.width, md.height];
    const pixels = await img.removeAlpha()
        .resize({width:1024,height:1024,fit:'fill'})
        .raw()
        .toBuffer();

    const red = [], green = [], blue = [];
    for (let index=0; index<pixels.length; index+=3) {
        red.push(pixels[index]/255.0);
        green.push(pixels[index+1]/255.0);
        blue.push(pixels[index+2]/255.0);
    }

    const input = [...red, ...green, ...blue];
    return [input, img_width, img_height];
}

