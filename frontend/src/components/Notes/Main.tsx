import React, {Component} from 'react';
import {WithStyles, Paper, MenuList, MenuItem, Grid, Container} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import {ContentTextarea, TitleInput} from "../../elements/inputs";
import { SubmitButton } from "../../elements/buttons";
import {StateContext} from "../../utils/state";
import {Note} from "../../reducers";
import {styles} from "./MainStyles";

interface IProps extends WithStyles<typeof styles> {}
type State = {
    id_counter: number
    current_note_id: number
    notes: Note[]
    show_saved: boolean
}

class Main extends Component<IProps, State> {
    static contextType = StateContext;

    state = {
        id_counter: 0,
        current_note_id: 0,
        notes: [
            {id: 0, title: "Your First Note", content: "Content here", selected: true},
        ],
        show_saved: false
    }

    componentDidMount() {
        const [{ notes }] = this.context;

        this.setState({
            notes: [
                ...notes
            ]
        })
    }

    findNoteById = (id: number) => {
        return this.state.notes.find((el) => el.id === id)
    }

    unselectCurrentNote = () => {
        const current_note: Note|undefined = this.findNoteById(this.state.current_note_id)
        if (current_note) {
            current_note.selected = false;
        }
    }

    onAddNote = (dispatch: Function, notes: []) => {
        const new_id = this.state.id_counter+1;
        const new_note: Note = {id: new_id, title: `New note (${new_id})`, content:'', selected: true}
        this.unselectCurrentNote();
        dispatch({type: "addNote", value: new_note})
        const old_notes = notes.map((el:Note) => {
            el.selected = false
            return el
        })
        this.setState({
            id_counter: new_id,
            current_note_id: new_id,
            notes: [
                ...old_notes,
                new_note
            ],
            show_saved: false
        })
    }

    onDeleteNote = (current_note: Note|undefined, dispatch: Function) => {
        if (current_note) {
            const notes = [...this.state.notes];
            const new_notes = notes.filter((el) => el.id !== current_note.id)
            dispatch({type: "removeNote", value: current_note})
            this.setState({
                notes: new_notes,
            })
        }
    }

    onSelectNote = (event: React.MouseEvent<HTMLElement>,notes: [], id: number) => {
        const this_note: Note|undefined = this.findNoteById(id);
        if (this_note) {
            this.unselectCurrentNote();
            const new_notes = notes.map((el: Note) => (el.id === this_note.id ?
                                                                {...el, selected: true} : el))
            this.setState({
                current_note_id: id,
                notes: new_notes,
                show_saved: false
            })
        }
    }

    onSubmit = (current_note: Note|undefined, dispatch: Function) => {
        if (current_note) {
            dispatch({type: "updateNotes", value: [...this.state.notes]})
            this.setState({
                show_saved: true
            })
        }
    }

    onTitleChange = (event: React.ChangeEvent<HTMLInputElement>, current_note: Note|undefined) => {
        if (current_note) {
            this.setState({
                show_saved: false,
                notes: this.state.notes.map((el: Note) => (el.id === current_note.id ?
                                                            {...el, title: event.currentTarget.value} : el))
            })
        }
    }

    onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>, current_note: Note|undefined) => {
        if (current_note) {
            const new_notes = this.state.notes.map((el: Note) => (el.id === current_note.id ?
                                                        {...el, content: event.currentTarget.value} : el))
            this.setState({
                show_saved: false,
                notes: new_notes
            })
        }
    }

    render() {
        const [{ notes }, dispatch] = this.context;
        const {classes} = this.props;
        const current_note: Note|undefined = this.findNoteById(this.state.current_note_id);
        return (
            <div className={classes.root}>
                <Grid sm={3} item>
                    <Paper className={classes.paperMenu}>
                        <MenuList>
                            <p className={classes.menuTitle}>Notes</p>
                            {this.state.notes ? this.state.notes.map((el) => (
                                <div className={classes.menuItemBox} key={el.id}>
                                    <MenuItem
                                              className={classes.menuSelectItem}
                                              classes={{ selected: classes.menuSelectedItem}}
                                              selected={el.selected}
                                              onClick={(event) =>
                                                  this.onSelectNote(event,notes,el.id)}>
                                        {el.title ? el.title : <span className={classes.unnamedNote}>Unnamed note</span>}
                                    </MenuItem>
                                    {el.selected ? <DeleteIcon key={el.id}
                                                               onClick={() => this.onDeleteNote(current_note, dispatch)}
                                                               className={classes.menuDeleteItem}/> : ""}
                                </div>
                            )) : ""}
                            <MenuItem className={classes.menuAddItem} onClick={() => this.onAddNote(dispatch, notes)}>
                                <AddBoxIcon/>
                            </MenuItem>
                        </MenuList>
                    </Paper>
                </Grid>
                <Grid sm={9} item>
                    <Container component="main" maxWidth="sm">
                        {current_note ? <div className={classes.contentBlock}>
                            <TitleInput onChange={(event) => {
                                this.onTitleChange(event, current_note)
                            }}
                                        value={current_note ? current_note.title : ""}
                                        placeholder={"Note Title"}
                            />
                            <ContentTextarea aria-label="textarea" placeholder="Content"
                                             value={current_note ? current_note.content : ""}
                                             onChange={(event) => this.onContentChange(event, current_note)}
                            />
                            <div className={classes.savingBlock}>
                                <SubmitButton className={classes.submitButton}
                                              onClick={() => this.onSubmit(current_note, dispatch)}>Save</SubmitButton>
                                {this.state.show_saved ? <div className={classes.savedMessage}>&#10003; Saved!</div> : ""}
                            </div>
                        </div>: ""}
                    </Container>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Main);