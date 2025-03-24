import { c as copy } from './index-b1a62205.js';
import { m as makeApiUrl, g as getData } from './getData-deef20ca.js';

const mediumDetailURL = makeApiUrl("gmdb_medium_by_gmid");

const processData = (body, extraComponents = []) => {
    const id = body.meta.gm.split("/").pop();
    return {
        id,
        originalId: body.meta.original_media_id,
        name: body.meta.name,
        srcLabel: getSrcLabel(body.meta.src_url),
        srcUrl: body.meta.src_url,
        ph: body.meta.ph,
        components: processComponents(id, body.components, body.comments),
        extraComponents,
    };
};
const processComponents = (myId, tables, comments) => {
    return [...processComponentTables(tables, myId), ...processComponentComments(comments)].sort((a, b) => a.index - b.index);
};
const processComponentTables = (tables, gmID) => {
    return tables.map((table) => ({
        index: table.paragraph_index,
        name: table.subcomponent_name,
        items: table.items.map((item) => ({
            id: item.gmo_id || "",
            componentName: item.component_name,
            componentLabel: item.label || "",
            concValue: item.conc_value?.toString() || "",
            concUnit: item.conc_unit || "",
            volume: item.volume?.toString() || "",
            unit: item.unit || "",
            referenceMediaId: !item.reference_media_id || item.reference_media_id === gmID ? "" : item.reference_media_id,
        })),
    }));
};
const processComponentComments = (comments) => {
    return comments.map((item) => ({
        index: item.paragraph_index,
        comment: item.comment ? item.comment : "&nbsp;",
    }));
};
const getSrcLabel = (str) => {
    switch (true) {
        case str.match(/jcm.*riken/) !== null:
            return "JCM";
        case str.match(/nite.*nbrc/) !== null:
            return "NBRC";
        case str.match(/dsmz\.de/) !== null:
            return "DSMZ";
        case str.match(/atcc\.org/) !== null:
            return "ATCC";
        default:
            return "SRC";
    }
};

const getMedia = async (gm_id) => {
    const result = await getData(mediumDetailURL, {
        gm_id,
    });
    if (!result.body)
        throw new Error("No data found");
    const extra = await getExternalReferences(result.body, gm_id);
    return processData(result.body, extra);
};
const getExternalReferences = async (body, gm_id) => {
    const externalReferences = copy(body)
        .components.map((component) => component.items.filter((item) => !!item.reference_media_id && item.reference_media_id !== gm_id))
        .filter((item) => item.length > 0)
        .flat()
        .map((item) => ({
        id: item.reference_media_id,
        name: item.component_name.replace(/ \(.*\)/, "").replace(/\*/g, ""),
    }));
    const extraData = [];
    for await (const ref of externalReferences) {
        const result = await getData(mediumDetailURL, {
            gm_id: ref.id,
        });
        if (result.body) {
            const data = processData(result.body);
            const components = data.components;
            const target = components.find((item) => item.name === ref.name);
            const arr = [target];
            if (target) {
                const targetIndex = components.indexOf(target);
                let i = 1;
                while (components[targetIndex + i]?.comment) {
                    const comment = components[targetIndex + i];
                    arr.push(comment);
                    i++;
                    if (i > 100)
                        break;
                }
            }
            extraData.push({ components: arr, id: ref.id });
        }
    }
    return extraData;
};

export { getMedia as g };
//# sourceMappingURL=getMedia-b567754c.js.map
