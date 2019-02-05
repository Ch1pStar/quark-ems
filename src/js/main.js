function init() {
	const physics_tick = Module._tick;
	const width = window.innerWidth;
	const height = window.innerHeight;
	const app = new PIXI.Application({
		width,
		height,
		backgroundColor: 0x006666,
	});
	let count = Module._create_nodes(165000);
	const nodes = new Array(count);
	const sprites = new Array(count);

	PIXI.Ticker.shared.stop();
	document.body.appendChild(app.view);

	create_sprites();
	app.ticker.add(tick);

	function tick() {
		let a = physics_tick();

		read_nodes(count, a);
		// render();
	}

	function render() {
		for (var i = 0, len=sprites.length; i<len; i++) {
			var s = sprites[i];

			s.x = nodes[i].x;
			s.y = nodes[i].y;
		}
	}

	function create_sprites() {
		const txt = PIXI.Texture.from('assets/p4.png');

		for (let i = 0; i < count; i++) {
			const s = new PIXI.Sprite(txt);

			sprites[i] = s;
			// app.stage.addChild(s);
		}
	}

	const buffer = Module.buffer;
	const node_size = Module._node_size();
	const view = new DataView(buffer, Module._get_nodes(), node_size*count);

	const id_location = 0*4;
	const x_location = 1*4;
	const y_location = 2*4;

	for (var i = 0; i < count; i++) {
		nodes[i] = {id:0, x:0, y:0};
	}

	function read_nodes(len = count) {
		// member location formula - (member_index*member_size)+(node_index*node_size)
		for (var i = 0; i<len; i++) {
			const index = i*node_size;

			const id = view.getUint32(id_location+index, true);
			const x = view.getUint32(x_location+index, true);
			const y = view.getUint32(y_location+index, true);
			const node = {id, x, y};

			nodes[i].id = id;
			nodes[i].x = x;
			nodes[i].y = y;

			// console.log(`Reading node(${i}) {id: ${node.id}, x: ${node.x}, y: ${node.y}}`);
			// alert(`Reading node(${i}) {id: ${node.id}, x: ${node.x}, y: ${node.y}}`);
		}
		// console.log('-------------------------------------');
	}

	window.read_nodes = read_nodes;
	read_nodes(count);
}


Module['onRuntimeInitialized'] = init;

// const test_local_tick = () => {
// 	class Node{
// 		constructor() {
// 			this.id = ~~Math.random()*Number.MAX_SAFE_INTEGER;
// 			this.x = 0;
// 			this.y = 0;
// 		}
// 	}

// 	const nodes = new Array(600000);

// 	for (let i=0,len=nodes.length; i<len; i++) {
// 		nodes[i] = new Node;
// 	}

// 	const local_tick = () => {
// 		for (let i = 0; i < nodes.length; i++) {
// 			let n = nodes[i];

// 			n.x = i;
// 			n.y = i*i;
// 		}
// 	}


// 	app.ticker.add(local_tick);
// }
// test_local_tick();