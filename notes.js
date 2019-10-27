const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.bgCyan('New note ' + title + ' added'));
    }
    else {
        console.log(chalk.bgMagenta('Note title already taken'));
    }
};

const removeNote = title => {
    const notes = loadNotes();
    const newNotes = notes.filter(note => note.title != title);
    if (newNotes.length !== notes.length) {
        saveNotes(newNotes);
        console.log(chalk.bgGreen('Note ' + title + ' successfully removed'));
    } else {
        console.log(chalk.bgRed('No note found'));
    }
};

const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find(note => note.title === title);
    if (noteToRead) {
        console.log(chalk.cyan(noteToRead.title));
        console.log(chalk.grey(noteToRead.body));
    } else {
        console.log(chalk.bgRed('No note found with title ' + title));
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bgCyan('Your Notes'));
    notes.forEach(note => {
        console.log(chalk.green(note.title));
    });
};

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
    listNotes: listNotes,
};