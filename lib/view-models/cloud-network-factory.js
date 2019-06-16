const calculateSize = (minSize, maxSize, ratio) =>
    ratio * (maxSize - minSize) + minSize

function newViewModelFactory({
    minVmSize = 10,
    maxVmSize = 40,
    minLbSize = 15,
    maxLbSize = 50,
    minDbSize = 10,
    maxDbSize = 40,
    minUnknownSize = 10,
    maxUnknownSize = 40,
    minUnknownDomainSize = 10,
    maxUnknownDomainSize = 40,
    minUncategorizedSize = 10,
    maxUncategorizedSize = 40,
    publicInternetSize = 45,
}) {
    let idCounter = 1;
    let startDate = new Date();
    let endDate = new Date(0);
    const idToNode = {};
    const idToEdge = {};
    const nodes = [];
    const edges = [];

    const storeNode = (node, kv) => {
        idToNode[node.id] = kv;
        nodes.push(node);
        return node;
    }

    return {
        addVMNode: (name, kvData = {}, sizeRatio = 0.5) => {
            return storeNode({
                id: idCounter++,
                label: name,
                size: calculateSize(minVmSize, maxVmSize, sizeRatio),
                group: 'vm',
            }, kvData);
        },
        addDBNode: (name, kvData = {}, sizeRatio = 0.5) => {
            return storeNode({
                id: idCounter++,
                label: name,
                size: calculateSize(minDbSize, maxDbSize, sizeRatio),
                group: 'db',
            }, kvData);
        },
        addLBNode: (name, kvData = {}, sizeRatio = 0.5) => {
            return storeNode({
                id: idCounter++,
                label: name,
                size: calculateSize(minLbSize, maxLbSize, sizeRatio),
                group: 'lb',
            }, kvData);
        },
        addUnknownNode: (name, kvData = {}, sizeRatio = 0.5) => {
            return storeNode({
                id: idCounter++,
                label: name,
                size: calculateSize(minUnknownSize, maxUnknownSize, sizeRatio),
                group: 'unknown',
            }, kvData);
        },
        addUnknownDomainNode: (name, kvData = {}, sizeRatio = 0.5) => {
            return storeNode({
                id: idCounter++,
                label: name,
                size: calculateSize(minUnknownSize, maxUnknownSize, sizeRatio),
                group: 'unknown_domain',
            }, kvData);
        },
        addUncategorizedNode: (name, kvData = {}, sizeRatio = 0.5) => {
            return storeNode({
                id: idCounter++,
                label: name,
                size: calculateSize(minUncategorizedSize, maxUncategorizedSize, sizeRatio),
                group: 'uncategorized',
            }, kvData);
        },
        addEdge: (srcNodeId, destNodeId, id, kvData = {}, isBidirectional = false) => {
            idToEdge[id] = kvData;
            const edge = {
                id,
                from: srcNodeId,
                to: destNodeId,
            }
            if (!isBidirectional) {
                edge.arrows = 'to';
            }
            edges.push(edge);
            return edge;
        },
        addPublicNode: (name = 'Public\nInternet', kvData = {}, sizeRatio = 0.5) => {
            return storeNode({
                id: idCounter++,
                label: name,
                size: publicInternetSize,
                group: 'public',
            }, kvData);
        },
        logDate: (date) => {
            startDate = new Date(Math.min(startDate.getTime(), date.getTime()));
            endDate = new Date(Math.max(endDate.getTime(), date.getTime()));
        },
        newViewModel: () => {
            return {
                idToNode,
                idToEdge,
                nodes,
                edges,
                startDate,
                endDate,
            };
        },
    }
}

module.exports = {
    newViewModelFactory,
}