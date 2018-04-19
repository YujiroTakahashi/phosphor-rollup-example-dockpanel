import widgets from 'phosphor-widgets';

class ContentWidget extends widgets.Widget {

    constructor(name) {
        super({ node: this.createNode() });
        this.setFlag(widgets.Widget.Flag.DisallowLayout);
        this.addClass('content');
        this.addClass(name.toLowerCase());
        this.title.label = name;
        this.title.closable = true;
    }

    createNode() {
        let node = document.createElement('div');
        let content = document.createElement('div');
        node.appendChild(content);
        return node;
    }
}

window.onload = () => {
    let r1 = new ContentWidget('Red');
    let b1 = new ContentWidget('Blue');
    let g1 = new ContentWidget('Green');
    let y1 = new ContentWidget('Yellow');

    let r2 = new ContentWidget('Red');
    let b2 = new ContentWidget('Blue');
    // let g2 = new ContentWidget('Green');
    // let y2 = new ContentWidget('Yellow');

    let dock = new widgets.DockPanel();
    dock.addWidget(r1);
    dock.addWidget(b1, { mode: 'split-right', ref: r1 });
    dock.addWidget(y1, { mode: 'split-bottom', ref: b1 });
    dock.addWidget(g1, { mode: 'split-left', ref: y1 });
    dock.addWidget(r2, { ref: b1 });
    dock.addWidget(b2, { mode: 'split-right', ref: y1 });
    dock.id = 'dock';

    widgets.BoxPanel.setStretch(dock, 1);

    let main = new widgets.SplitPanel();
    main.id = 'main';
    main.addWidget(dock);

    window.onresize = () => { main.update(); };
    widgets.Widget.attach(main, document.body);
}
