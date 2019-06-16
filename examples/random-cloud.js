const { newViewModelFactory } = require('../lib/view-models/cloud-network-factory');
const serveNetworkView = require('../lib/server');

const viewModelFactory = newViewModelFactory({});

// Generate Random Nodes
const addNodes = [viewModelFactory.addDBNode, viewModelFactory.addLBNode, viewModelFactory.addUnknownDomainNode, viewModelFactory.addUncategorizedNode, viewModelFactory.addUnknownNode, viewModelFactory.addVMNode];
const count = 50 + Math.random() * 100;
for (var i = 1; i <= count; i++) {
    addNodes[Math.floor(Math.random() * addNodes.length)]('Node ' + i, { some: 'data', rand: Math.random() }, Math.random());
}
viewModelFactory.addPublicNode();

// Generate Random Edges between Nodes
const edgeCount = count * 2;
const seen = {}
for (var i = 1; i <= edgeCount; i++) {
    const n1 = Math.floor(Math.random() * count);
    const n2 = Math.floor(Math.random() * count);

    if (seen[n1 + ',' + n2]) {
        continue;
    }
    seen[n1 + ',' + n2] = true;

    viewModelFactory.addEdge(
        n1, n2, i,
        { i, rand: Math.random },
        Math.random() > 0.5
    );
}

viewModelFactory.logDate(new Date());

serveNetworkView(() => viewModelFactory, 'cloud-network');