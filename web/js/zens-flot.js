

var zensPlot = function(dataArr, htmlTag, label, tickSize, timeFormat, minX, maxX, minY, maxY){

    var that = this;    
    $.plot(htmlTag,  [
        {
            data: dataArr[0],

            lines: { show: true },
            label: label[0],
            color: "#F80000",
            highlightColor: "#800000",
            shadowSize: 10,
            points: { show: false }

        },
        {
            data: dataArr[1],
            lines: { show: true },
            label: label[1],
            color: "#180000",
            highlightColor: "#800000",
            shadowSize: 10,
            points: { show: false }
        }],
        {
            legend: {
                show: true,
                position: "ne",
                labelBoxBorderColor: "white"
            },
            grid: {
                hoverable: true,
                backgroundColor: { colors: [{ brightness: 5.6, opacity: 1.8 }, "#fff", "#C0C0C0"] },
                clickable: true
            },
            xaxis: {
                mode: "time",
                timezone: "browser",
                tickSize: tickSize,
                font: {
                    size: 8,
                    style: "italic",
                    weight: "bold",
                    family: "sans-serif",
                    variant: "small-caps"
                },
                timeformat: timeFormat,
                min: minX,
                max: maxX
            },
            yaxis: {
                min: minY,
                max: maxY
            }
        } );

    var previousPoint = null;
    $(htmlTag).bind("plothover", function (event, pos, item) {
        $("#x").text(pos.x.toFixed(2));
        $("#y").text(pos.y.toFixed(2));
        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $("#tooltip").remove();
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);

                that.showTooltip(item.pageX, item.pageY, y + " " + label);
            }

        }
    });

    this.showTooltip =  function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5,
            border: '1px solid #fdd',
            padding: '2px',
            'background-color': '#fee',
            opacity: 0.80
        }).appendTo("body").fadeIn(200);
    }
};
