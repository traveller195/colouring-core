import { GeoJsonObject } from 'geojson';
import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import { LayerEnablementState } from '../../config/map-config';
import { apiGet } from '../../apiHelpers';

export function ConservationAreaBoundaryLayer({enablement}: {enablement: LayerEnablementState}) {
    const [boundaryGeojson, setBoundaryGeojson] = useState<GeoJsonObject>(null);

    useEffect(() => {
        apiGet('/geometries/conservation_areas.geojson')
            .then(data => setBoundaryGeojson(data as GeoJsonObject));
    }, []);

    if(enablement == "enabled") {
        return boundaryGeojson &&
        <GeoJSON 
        attribution='Conservation areas by <a href=http://www.bedfordpark.net/leo/planning/>Leo Hall</a> on <a href=https://creativecommons.org/licenses/by/4.0/legalcode>CC-BY 4.0 licence</a>, contains data under <a href=https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/>the Open Government Licence v.3.0</a>'
        data={boundaryGeojson}
        style={{color: '#cd7090', fill: true, weight: 1, opacity: 1, fillOpacity: 0.8}}
    />;
    } else if (enablement == "disabled") {
        return <div></div>
    } else {
        return boundaryGeojson &&
        <GeoJSON data={boundaryGeojson} style={{color: '#fff', fill: true}}/>;
    }
}

