import G6 from '@antv/g6';
import { uniqueId, toUnicode } from '&/utils';

const customNode = {
  init (mode, imageTypes) {
    G6.registerNode('customNode', {
      draw (cfg, group) {
        let size = cfg.size;
        if (!size) {
          size = [170, 34]
        }
        // 此处必须是NUMBER 不然bbox不正常
        const width = parseInt(size[0]);
        const height = parseInt(size[1]);
        const color = cfg.color;
        // 此处必须有偏移 不然drag-node错位
        const offsetX = -width / 2
        const offsetY = -height / 2
        const mainId = 'rect' + uniqueId()
        const shape = group.addShape('rect', {
          attrs: {
            id: mainId,
            x: offsetX,
            y: offsetY,
            width: width,
            height: height,
            stroke: '#ced4d9',
            fill: '#fff', // 此处必须有fill 不然不能触发事件
            radius: 4
          }
        });
        group.addShape('rect', {
          attrs: {
            x: offsetX,
            y: offsetY,
            width: 4,
            height: height,
            fill: color,
            parent: mainId,
            radius: [4, 0, 0, 4]
          }
        });
        group.addShape('image', {
          attrs: {
            x: offsetX + 16,
            y: offsetY + 8,
            width: 20,
            height: 16,
            img: cfg.image,
            parent: mainId
          }
        });
        group.addShape('image', {
          attrs: {
            x: offsetX + width - 32,
            y: offsetY + 8,
            width: 16,
            height: 16,
            parent: mainId,
            img: cfg.stateImage
          }
        });
        // if (cfg.backImage) {
        //   const clip = new Shape.Rect({
        //     attrs: {
        //       x: offsetX,
        //       y: offsetY,
        //       width: width,
        //       height: height,
        //       fill: '#fff',
        //       radius: 4
        //     }
        //   });
        //   group.addShape('image', {
        //     attrs: {
        //       x: offsetX,
        //       y: offsetY,
        //       width: width,
        //       height: height,
        //       img: cfg.backImage,
        //       clip: clip
        //     }
        //   });
        // }
        if (cfg.label) {
          group.addShape('text', {
            attrs: {
              id: 'label' + uniqueId(),
              x: offsetX + width / 2,
              y: offsetY + height / 2,
              textAlign: 'center',
              textBaseline: 'middle',
              text: cfg.label,
              parent: mainId,
              fill: '#565758'
            }
          });
        }
        if (cfg.inPoints) {
          for (let i = 0; i < cfg.inPoints.length; i++) {
            const x = width * cfg.inPoints[i][1];
            let y = 0;
            // 0为顶 1为底
            if (cfg.inPoints[i][0] === 0) {
              y = 0;
            } else {
              y = height;
            }
            const id = 'circle' + uniqueId()
            group.addShape('circle', {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isInPointOut: true,
                fill: '#1890ff',
                opacity: 0
              }
            });
            group.addShape('circle', {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isInPoint: true,
                fill: '#fff',
                stroke: '#1890ff',
                opacity: 0
              }
            });
          }
        }
        if (cfg.outPoints) {
          for (let i = 0; i < cfg.outPoints.length; i++) {
            let y = 0;
            const x = width * cfg.outPoints[i][1];
            // 0为顶 1为底
            if (cfg.outPoints[i][0] === 0) {
              y = 0;
            } else {
              y = height;
            }
            const id = 'circle' + uniqueId()
            group.addShape('circle', {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isOutPointOut: true,
                fill: '#1890ff',
                opacity: 0 // 默認0 需要時改成0.3
              }
            });
            group.addShape('circle', {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isOutPoint: true,
                fill: '#fff',
                stroke: '#1890ff',
                opacity: 0
              }
            });
          }
        }
        // group.sort()
        // 添加文本、更多图形
        return shape;
      },
      // 设置状态
      setState (name, value, item) {
        const group = item.getContainer();
        const shape = group.get('children')[0]; // 顺序根据 draw 时确定

        const children = group.findAll(g => {
          return g.attrs.parent === shape.attrs.id
        });
        const circles = group.findAll(circle => {
          return circle.attrs.isInPoint || circle.attrs.isOutPoint;
        });
        const selectStyles = () => {
          shape.attr('fill', '#f3f9ff');
          shape.attr('stroke', '#6ab7ff');
          shape.attr('cursor', 'move');
          children.forEach(child => {
            child.attr('cursor', 'move');
          });
          circles.forEach(circle => {
            circle.attr('opacity', 1)
          })
        };
        const unSelectStyles = () => {
          shape.attr('fill', '#fff');
          shape.attr('stroke', '#ced4d9');
          circles.forEach(circle => {
            circle.attr('opacity', 0)
          })
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
    G6.registerNode('monitorNode', {
      draw (cfg, group) {
        let size = cfg.size;
        cfg['inPoints'] = [[0, 0.5]];
        cfg['outPoints'] = [[1, 0.5]];

        if (!size) {
          size = [36, 36]
        }
        // 此处必须是NUMBER 不然bbox不正常
        const width = parseInt(size[0]);
        const height = parseInt(size[1]);
        // 此处必须有偏移 不然drag-node错位
        const offsetX = -width / 2;
        const offsetY = -height / 2;
        const mainId = 'rect' + uniqueId();
        const keyShape = group.addShape('rect', {
          attrs: {
            id: mainId,
            x: offsetX,
            y: offsetY,
            width: width,
            height: height,
            stroke: '#ced4d9',
            fill: '#fff', // 此处必须有fill 不然不能触发事件
            radius: 4
          },
          name: 'key-shape', // Not unique, you can assign any string value to it
          draggable: true // Allow this shape to be dragged
        });
        const imageType = imageTypes[cfg.imageTypeId];
        group.addShape('text', {
          attrs: {
            x: 0,
            y: 0,
            fontFamily: 'iconfont', // 对应css里面的font-family: "iconfont";
            textAlign: 'center',
            textBaseline: 'middle',
            fontSize: '24',
            text: toUnicode(imageType.iconText),
            parent: mainId,
            fill: cfg.stateColor
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: 'label-shape', // Not unique, you can assign any string value to it
          draggable: true // Allow this shape to be dragged
        });
        group.addShape('text', {
          attrs: {
            id: 'label' + uniqueId(),
            x: width / 2 + 5,
            y: 0,
            textAlign: 'left',
            textBaseline: 'middle',
            text: cfg.imageName || '',
            parent: mainId,
            fill: '#414141'
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: 'icon-text-shape', // Not unique, you can assign any string value to it
          draggable: true // Allow this shape to be dragged
        });
        if (cfg.inPoints) {
          for (let i = 0; i < cfg.inPoints.length; i++) {
            const x = width * cfg.inPoints[i][1];
            let y = 0;
            // 0为顶 1为底
            if (cfg.inPoints[i][0] === 0) {
              y = 0;
            } else {
              y = height;
            }
            const id = 'circle' + uniqueId()
            group.addShape('circle', {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isInPointOut: true,
                fill: '#1890ff',
                opacity: 0
              },
              // must be assigned in G6 3.3 and later versions. it can be any value you want
              name: 'anchor-in-shape', // Not unique, you can assign any string value to it
              draggable: true // Allow this shape to be dragged
            });
            group.addShape('circle', {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isInPoint: true,
                fill: '#fff',
                stroke: '#1890ff',
                opacity: 0
              },
              // must be assigned in G6 3.3 and later versions. it can be any value you want
              name: 'anchor-in-shape', // Not unique, you can assign any string value to it
              draggable: true // Allow this shape to be dragged
            });
          }
        }
        if (cfg.outPoints) {
          for (let i = 0; i < cfg.outPoints.length; i++) {
            let y = 0;
            const x = width * cfg.outPoints[i][1];
            // 0为顶 1为底
            if (cfg.outPoints[i][0] === 0) {
              y = 0;
            } else {
              y = height;
            }
            const id = 'circle' + uniqueId()
            group.addShape('circle', {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isOutPointOut: true,
                fill: '#1890ff',
                opacity: 0 // 默認0 需要時改成0.3
              },
              // must be assigned in G6 3.3 and later versions. it can be any value you want
              name: 'anchor-out-shape', // Not unique, you can assign any string value to it
              draggable: true // Allow this shape to be dragged
            });
            group.addShape('circle', {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isOutPoint: true,
                fill: '#fff',
                stroke: '#1890ff',
                opacity: 0
              },
              // must be assigned in G6 3.3 and later versions. it can be any value you want
              name: 'anchor-out-shape', // Not unique, you can assign any string value to it
              draggable: true // Allow this shape to be dragged
            });
          }
        }
        // group.sort()
        // 添加文本、更多图形
        return keyShape;
      },
      // 设置状态
      setState (name, value, item) {
        const group = item.getContainer();
        const shape = group.get('children')[0]; // 顺序根据 draw 时确定

        const children = group.findAll(g => {
          return g.attrs.parent === shape.attrs.id
        });
        const circles = group.findAll(circle => {
          return circle.attrs.isInPoint || circle.attrs.isOutPoint;
        });
        const selectStyles = () => {
          shape.attr('fill', '#f3f9ff');
          shape.attr('stroke', '#6ab7ff');
          if (mode === 'edit') {
            shape.attr('cursor', 'move');
            children.forEach(child => {
              child.attr('cursor', 'move');
            });
            circles.forEach(circle => {
              circle.attr('opacity', 1)
            })
          }
        };
        const unSelectStyles = () => {
          shape.attr('fill', '#fff');
          shape.attr('stroke', '#ced4d9');
          circles.forEach(circle => {
            circle.attr('opacity', 0)
          })
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
  }
}

export default customNode
