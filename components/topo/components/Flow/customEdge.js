import G6 from '@antv/g6';
import { uniqueId } from '&/utils'
const MIN_ARROW_SIZE = 3

const customEdge = {
  init () {
    const dashArray = [
      [0, 1],
      [0, 2],
      [1, 2],
      [0, 1, 1, 2],
      [0, 2, 1, 2],
      [1, 2, 1, 2],
      [2, 2, 1, 2],
      [3, 2, 1, 2],
      [4, 2, 1, 2]
    ];

    const lineDash = [4, 2, 1, 2];
    const interval = 9;
    G6.registerEdge('customEdge', {
      draw (cfg, group) {
        let sourceNode, targetNode, start, end
        if (typeof (cfg.source) === 'string') {
          cfg.source = cfg.sourceNode
        }
        if (!cfg.start) {
          cfg.start = {
            x: 0,
            y: 17
          }
        }
        if (!cfg.end) {
          cfg.end = {
            x: 0,
            y: -17
          }
        }
        if (!cfg.source.x) {
          sourceNode = cfg.source.getModel()
          start = { x: sourceNode.x + cfg.start.x, y: sourceNode.y + cfg.start.y }
        } else {
          start = cfg.source
        }
        if (typeof (cfg.target) === 'string') {
          cfg.target = cfg.targetNode
        }
        if (!cfg.target.x) {
          targetNode = cfg.target.getModel()
          end = { x: targetNode.x + cfg.end.x, y: targetNode.y + cfg.end.y }
        } else {
          end = cfg.target
        }

        let path = []
        const hgap = Math.abs(end.x - start.x)
        if (end.x > start.x) {
          path = [
            ['M', start.x, start.y],
            [
              'C',
              start.x,
              start.y + hgap / (hgap / 50),
              end.x,
              end.y - hgap / (hgap / 50),
              end.x,
              end.y - 4
            ],
            [
              'L',
              end.x,
              end.y
            ]
          ]
        } else {
          path = [
            ['M', start.x, start.y],
            [
              'C',
              start.x,
              start.y + hgap / (hgap / 50),
              end.x,
              end.y - hgap / (hgap / 50),
              end.x,
              end.y - 4
            ],
            [
              'L',
              end.x,
              end.y
            ]
          ]
        }
        let lineWidth = 1;
        lineWidth = lineWidth > MIN_ARROW_SIZE ? lineWidth : MIN_ARROW_SIZE;
        const width = lineWidth * 10 / 3;
        const halfHeight = lineWidth * 4 / 3;
        const radius = lineWidth * 4;
        const endArrowPath = [
          ['M', width, halfHeight],
          ['L', 0, 0],
          ['L', width, -halfHeight],
          ['A', radius, radius, 0, 0, 0, width, halfHeight],
          ['Z']
        ];
        const keyShape = group.addShape('path', {
          attrs: {
            id: 'edge' + uniqueId(),
            path: path,
            stroke: cfg.stateColor || '#9daafa',
            lineAppendWidth: 10,
            endArrow: {
              path: endArrowPath
            }
          }
        });
        return keyShape
      },
      afterDraw (cfg, group) {
        if (cfg.source.getModel().isDoingStart && cfg.target.getModel().isDoingEnd) {
          const shape = group.get('children')[0];
          const length = shape.getTotalLength(); // G 新增了 totalLength 的接口
          let totalArray = [];
          for (var i = 0; i < length; i += interval) {
            totalArray = totalArray.concat(lineDash);
          }
          let index = 0;
          shape.animate({
            onFrame () {
              const cfg = {
                lineDash: dashArray[index].concat(totalArray)
              };
              index = (index + 1) % interval;
              return cfg;
            },
            repeat: true
          }, 3000);
        }
      },
      setState (name, value, item) {
        const model = item.getModel();
        const group = item.getContainer();
        const shape = group.get('children')[0];
        const selectStyles = () => {
          shape.attr('stroke', '#6ab7ff');
        };
        const unSelectStyles = () => {
          shape.attr('stroke', model.stateColor || '#9daafa');
        };

        switch (name) {
          case 'selected':
          case 'hover':
            if (value) {
              selectStyles()
            } else {
              unSelectStyles()
            }
            break;
        }
      }
    });
    G6.registerEdge('monitorEdge', {
      draw (cfg, group) {
        let sourceNode, targetNode, start, end
        if (typeof (cfg.source) === 'string') {
          cfg.source = cfg.sourceNode
        }
        if (!cfg.start) {
          cfg.start = {
            x: 0,
            y: 17
          }
        }
        if (!cfg.end) {
          cfg.end = {
            x: 0,
            y: -17
          }
        }
        if (!cfg.source.x) {
          sourceNode = cfg.source.getModel()
          start = { x: sourceNode.x + cfg.start.x, y: sourceNode.y + cfg.start.y }
        } else {
          start = cfg.source
        }
        if (typeof (cfg.target) === 'string') {
          cfg.target = cfg.targetNode
        }
        if (!cfg.target.x) {
          targetNode = cfg.target.getModel()
          end = { x: targetNode.x + cfg.end.x, y: targetNode.y + cfg.end.y }
        } else {
          end = cfg.target
        }

        let path = [];
        const baseDistance = 20;
        path = [
          ['M', start.x, start.y],
          [
            'L',
            start.x,
            start.y + baseDistance
          ],
          end.y - start.y < (baseDistance * 2) ? ['L', start.x + (end.x - start.x) / 2, start.y + baseDistance] : ['L', start.x, start.y + (end.y - start.y) / 2],
          end.y - start.y < (baseDistance * 2) ? ['L', start.x + (end.x - start.x) / 2, end.y - baseDistance] : ['L', end.x, start.y + (end.y - start.y) / 2],
          [
            'L',
            end.x,
            end.y - baseDistance
          ],
          [
            'L',
            end.x,
            end.y
          ]
        ]
        let lineWidth = 1;
        lineWidth = lineWidth > MIN_ARROW_SIZE ? lineWidth : MIN_ARROW_SIZE;
        const width = lineWidth * 10 / 3;
        const halfHeight = lineWidth * 4 / 3;
        const radius = lineWidth * 4;
        const endArrowPath = [
          ['M', -width, halfHeight],
          ['L', 0, 0],
          ['L', -width, -halfHeight],
          ['A', radius, radius, 0, 0, 1, -width, halfHeight],
          ['Z']
        ];
        const keyShape = group.addShape('path', {
          attrs: {
            id: 'edge' + uniqueId(),
            path: path,
            stroke: cfg.stateColor || '#9daafa',
            lineAppendWidth: 10,
            endArrow: {
              path: endArrowPath
            }
          }
        });
        if (cfg.label) {
          group.addShape('text', {
            attrs: {
              id: 'label' + uniqueId(),
              x: start.x + (end.x - start.x) / 2,
              y: start.y + (end.y - start.y) / 2,
              textAlign: 'center',
              textBaseline: 'middle',
              fontSize: '16',
              fontWeight: '800',
              text: cfg.label,
              fill: '#565758'
            }
          });
        }
        return keyShape
      },
      afterDraw (cfg, group) {
        if (cfg.source.getModel().isDoingStart && cfg.target.getModel().isDoingEnd) {
          const shape = group.get('children')[0];
          const length = shape.getTotalLength(); // G 新增了 totalLength 的接口
          let totalArray = [];
          for (var i = 0; i < length; i += interval) {
            totalArray = totalArray.concat(lineDash);
          }
          let index = 0;
          shape.animate({
            onFrame () {
              const cfg = {
                lineDash: dashArray[index].concat(totalArray)
              };
              index = (index + 1) % interval;
              return cfg;
            },
            repeat: true
          }, 3000);
        }
      },
      setState (name, value, item) {
        const model = item.getModel();
        const group = item.getContainer();
        const shape = group.get('children')[0];
        const selectStyles = () => {
          shape.attr('stroke', '#6ab7ff');
          item.toFront();
        };
        const unSelectStyles = () => {
          shape.attr('stroke', model.stateColor || '#9daafa');
          item.toFront();
        };

        switch (name) {
          case 'selected':
          case 'hover':
            if (value) {
              selectStyles()
            } else {
              unSelectStyles()
            }
            break;
        }
      }
    });
    G6.registerEdge('link-edge', {
      draw (cfg, group) {
        let sourceNode, targetNode, start, end;
        if (!cfg.source.x) {
          sourceNode = cfg.source.getModel()
          start = { x: sourceNode.x + cfg.start.x, y: sourceNode.y + cfg.start.y }
        } else {
          start = cfg.source
        }
        if (!cfg.target.x) {
          targetNode = cfg.target.getModel()
          end = { x: targetNode.x + cfg.end.x, y: targetNode.y + cfg.end.y }
        } else {
          end = cfg.target
        }

        let path = []
        path = [
          ['M', start.x, start.y],
          ['L', end.x, end.y]
        ]
        const keyShape = group.addShape('path', {
          attrs: {
            id: 'edge' + uniqueId(),
            path: path,
            stroke: cfg.stateColor || '#9daafa',
            strokeOpacity: 0.9,
            lineDash: [5, 5]
          }
        });
        return keyShape
      }
    });
  }
}

export default customEdge
