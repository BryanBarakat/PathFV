export function getMatrix(height, width) {
  let mat = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      let node = {
        x: j,
        y: i,
        iswall: false,
        isstart: false,
        istarget: false,
        isbomb: false,
        iseraser: false,
        weight: 1,
      };
      row.push(node);
    }
    mat.push(row);
  }

  mat[Math.floor(height / 2)][Math.floor(width / 2)].isstart = true;
  mat[height - 2][width - 2].istarget = true;

  return mat;
}

export default getMatrix;
