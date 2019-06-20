/* Written by Ye Liu */

const parseGid = (keyword) => {
    const gid = parseInt(keyword);
    return isNaN(gid) ? 0 : gid;
};

const parseGeoJSON = geom => {
    if (Array.isArray(geom)) {
        // Feature collection
        geom.map(item => {
            item.type = 'Feature';
            item.properties = {};
            item.geometry = JSON.parse(item.geometry);
        });

        return {
            type: 'FeatureCollection',
            features: geom
        };
    } else {
        // Single feature
        return {
            type: 'Feature',
            properties: {},
            geometry: JSON.parse(geom)
        };
    }
}

export { parseGid, parseGeoJSON };
