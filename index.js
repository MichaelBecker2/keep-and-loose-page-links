const fs = require('fs')
const pug = require('pug')
const pretty = require('pretty')
const open = require('open')
const argv = require('yargs')
    .usage('Usage: $0 [options]')
    .example('$0 -f test.csv', 'creates new html file with links of test.csv')
    .option('f', {
        alias: 'file',
        demand: true,
        describe: 'csv file with the keep page links',
        type: 'string'
    })
    .option('d', {
        alias: 'domain',
        demand: true,
        describe: 'domain of the page links',
        type: 'string'
    })
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2019')
    .argv

const file = argv.file
const domain = argv.domain

function read() {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (error, data) => {
            if (error) reject(error)
            else resolve(data)
        })
    })
}

function write(html) {
    return new Promise((resolve, reject) => {
        fs.writeFile('index.html', pretty(html), 'utf8', error => {
            if (error) reject(error)
            else resolve()
        })
    })
}

(async () => {
    const csvData = await read()

    const categories = []
    const allLinks = csvData.split('\n')
        .map(link => {
            const category = link.split('/')[2] ? link.split('/')[2].replace('.html', '').trim() : '_none'
            const url = `https://${domain}${link}`

            if (! categories.includes(category)) categories.push(category)

            return {
                category,
                url
            }
        })

    const amount = allLinks.length

    categorizedLinks = categories.map(category => ({
            name: category,
            links: allLinks.filter(link => link.category == category)
        }))
        .sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
        })

    const fn = pug.compileFile(`./views/index.pug`)
    const html = fn({
        amount,
        domain,
        categories: categorizedLinks
    })

    await write(html)

    try {
        open(`file://${process.cwd()}/index.html`, 'google chrome')
    } catch (error) {
        open(`file://${process.cwd()}/index.html`)
    }
})()

