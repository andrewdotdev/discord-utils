import { readdirSync } from 'node:fs' 
import { join, resolve } from 'node:path';

export async function recursiveFiles(path: string): Promise<string[]> {
  let paths: string[] = [];
  path = resolve(path);
  console.log(path);
    for (const i of readdirSync(path, { withFileTypes: true })) {
        if (i.isDirectory()) paths = paths.concat(await recursiveFiles(join(path, i.name)));
        else {
            if (!i.name.match(/\.(ts|js)$/)) continue;
            const file = await import(i.path).catch(() => {});
            if (file?.data) paths.push(file);
        }
    }

  return paths;
}