const fs = require('fs')
const express = require('express')
const yaml = require('yaml')
const cors = require('cors')

// get config.yaml and parse it to a JS object.
const config = yaml.parse(fs.readFileSync('./config.yaml', 'utf-8'))

const port = config.startport;
const monitors = config.monitors;

let pages = []

for (let i = 0; i < monitors; i++) {
	pages.push(express());
	pages[i].use(express.static('public'))
}

for (let i = 0; i < monitors; i++) {

	console.log('\nSetting Views for Raspberry pi: '+i+'@ port: '+(port+i))

	pages[i].get('/',(req, res) => {
		res.send('LOADING...')
	})

	pages[i].get('/get',(req, res) => {
		let jsong = {}

		for (let j = 0; j < config.setmonitors[port+i].showpages.length; j++) {

			// mhmm makes sense lmao
			jsong[config.setmonitors[port+i].showpages[j]] = config.pages[config.setmonitors[port+i].showpages[j]]
			
		}
		res.json(jsong)
	})

	// console.log(config.setmonitors[port+i].showpages)

	for (let j = 0; j < config.setmonitors[port+i].showpages.length; j++) {

		pages[i].get('/'+config.setmonitors[port+i].showpages[j], (req, res) => {
			res.sendFile(__dirname+'/views/'+config.setmonitors[port+i].showpages[j]+'.html')
		})
		// on appended js add a marker to indicate what page it is on

		console.log(' + Page at '+config.setmonitors[port+i].showpages[j])
	}

}

console.log('\n')

for (let i = 0; i < monitors; i++) {
	pages[i].listen(port+i, () => {
		console.log(`Server opened for Raspberry Pi: ${i}, on port: ${port+i}`)
	})
}

// console.log(port)