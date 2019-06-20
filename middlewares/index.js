/* Written by Ye Liu */

import _ from 'lodash';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const mapDir = d => {
    const tree = {};

    // Get file list
    const [dirs, files] = _(readdirSync(d)).partition(p => statSync(join(d, p)).isDirectory());

    // Map folders
    dirs.forEach(dir => {
        tree[dir] = mapDir(join(d, dir))
    });

    // Map files
    files.forEach(file => {
        if (extname(file) === '.js') {
            tree[basename(file, '.js')] = require(join(d, file)).default;
        }
    });

    return tree;
}

export default mapDir(join(__dirname));
