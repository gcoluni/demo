function dragstarted(d) {
    if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) {
        simulation.alphaTarget(0);
    }

    d.fx = null;
    d.fy = null;
}

// function ticked() {
//     link
//         .attr("x1", function(d) { return d.source.x; })
//         .attr("y1", function(d) { return d.source.y; })
//         .attr("x2", function(d) { return d.target.x; })
//         .attr("y2", function(d) { return d.target.y; });
//
//     node.attr("transform", (d) => {
//             return "translate (" +
//                 d.x + "," +
//                 d.y + ")";
//         });
// }

function ticked() {
    link.attr("d", positionLink);
    node.attr("transform", positionNode);
}

// links are drawn as curved paths between nodes,
// through the intermediate nodes
function positionLink(d) {
    var offset = 30;

    var midpoint_x = (d.source.x + d.target.x) / 2;
    var midpoint_y = (d.source.y + d.target.y) / 2;

    var dx = (d.target.x - d.source.x);
    var dy = (d.target.y - d.source.y);

    var normalise = Math.sqrt((dx * dx) + (dy * dy));

    var offSetX = midpoint_x + offset*(dy/normalise);
    var offSetY = midpoint_y - offset*(dx/normalise);

    return "M" + d.source.x + "," + d.source.y +
        "S" + offSetX + "," + offSetY +
        " " + d.target.x + "," + d.target.y;
}

// move the node based on forces calculations
function positionNode(d) {
    // keep the node within the boundaries of the svg
    if (d.x < 0) {
        d.x = 0
    };
    if (d.y < 0) {
        d.y = 0
    };
    if (d.x > 1250) {
        d.x = 1250
    };
    if (d.y > 500) {
        d.y = 500
    };
    return "translate(" + d.x + "," + d.y + ")";
}