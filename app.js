const chalk = require("chalk");
const yargs = require('yargs');
const notes = require('./notes.js');

yargs.command({
    command: 'add',
    describe: 'Adds a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});
yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: {
            describe: 'The title of the note to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});
yargs.command({
    command: 'read',
    describe: 'Reads a note',
    builder: {
        title: {
            describe: 'The title of the note to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});
yargs.command({
    command: 'list',
    describe: 'Lists all notes',
    handler() {
        notes.listNotes();
    }
});

yargs.parse();