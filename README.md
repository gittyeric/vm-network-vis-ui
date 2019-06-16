# vm-network-vis-ui

Generates an interactive network graph for full transparency into your systems.

![Network Graph](netgraph.png "Network Graph")

## Modifying

Steal this project and modify it to your whim to connect vis.js visualizations with Express to serve it.  /lib contains mini-apps you can use.  Currently there's a cloud-network app that has a file to generate a View Model which is then handed to the ejs view file for rendering.  Check out examples/random-cloud.js to see how you can connect your own network nodes / edges to the UI.

## Running the Example

Just run:

`npm i`

to install dependencies, then 

`node examples/random-cloud.js`

You can then access the UI at http://localhost:3000.

## Special Thanks

I stole the initial Vis.js / Express boilerplate from [twitterdev](https://github.com/twitterdev/node-timeline-visualizations) which saved me some time, thanks!