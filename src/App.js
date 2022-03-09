    import { useEffect, useState } from 'react';
    import {nanoid } from 'nanoid';
    import NotesList from './components/NotesList';
    import Search from './components/Search';
    import Header from './components/Header';

      const App = () => {
        const [notes, setNotes] = useState([
          {
            id: nanoid(),
            text: 'this is my first notes',
            date: '15/04/2021',
          },
          {
            id: nanoid(),
            text: 'this is my second  notes',
            date: '22/08/2022',
          },
          {
            id: nanoid(),
            text: 'this is my third notes',
            date:'22/09/2021',
          },
          {
            id: nanoid(),
            text: 'this is my new  notes',
            date:'30/09/2021',
          },
      ]);
      const [searchText , setSearchText] = useState('');

        const[darkMode, setDarkMode] = useState(false);

          useEffect(() =>   {
          const savedNotes =JSON.parse(localStorage.getItem('react-notes-app-data')
          );

          if(savedNotes){
            setNotes(savedNotes);
          }

          },[])
          
        useEffect(() => {
          localStorage.setItem('react-notes-app-data', JSON.stringify(notes)
            );
        },  [notes])

      const addNote = (text) => {
        const date =new Date();
        const newNote = { 
          id: nanoid(),
          text: text,
          date: date.toLocaleDateString()

        };
        const newNotes = [...notes ,newNote];
        setNotes(newNotes);
      };

          const deleteNote = (id) => {
            const newNotes = notes.filter((note) => note.id !== id);
            setNotes(newNotes);
            }

        return (
          <div className={`${darkMode && 'dark-mode'}`}>
        <div className='container'>
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText}/>
          <NotesList 
          notes = {notes.filter((note)=> note.text.toLowerCase().includes(searchText) )}
          handleAddNote ={addNote} 
            handleDeleteNote={deleteNote}
          />

        </div>
          </div>
        
        );
      };
      export default App;
