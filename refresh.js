const fs = require('fs')
const yaml = require('yaml')
let files = fs.readdirSync('./views')

let config = yaml.parse(fs.readFileSync('./config.yaml', 'utf-8'))
console.log('generated config \n')
fs.writeFileSync('./backup.yaml', yaml.stringify(config))

for (let i = 0; i < files.length; i++) {
	const file = files[i];
	const title = file.split('.')[0];
	// console.log(title)
	// console.log(config)

	// dumb but it works so idc
	try {
		if(config.pages[title]["time"] == 15) {
			config.pages[title] = {time: 15}
		}
	}

	catch {
		config.pages[title] = {time: 15}
	}

}

console.log('setting config \n')


for (let i = 0; i < config.monitors; i++) {
	try {
		if(config.setmonitors[config.startport+i].length < 0) {
			false;
		}
	}

	catch {
		console.error('bruh');
		config.setmonitors[config.startport+i] = {showpages: []}
	}
}

// console.log(pages)

fs.writeFileSync('./config.yaml', yaml.stringify(config))

// console.log(yaml.stringify(config))