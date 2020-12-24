import React, {Component} from 'react';
import {Theme, WithStyles, Paper, MenuList, MenuItem, Grid, Container} from "@material-ui/core";
import {withStyles, createStyles} from "@material-ui/core/styles";
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import green from '@material-ui/core/colors/green';
import {ContentTextarea, TitleInput} from "../../elements/inputs";
import { SubmitButton } from "../../elements/buttons";
import {StateContext} from "../../utils/state";
import {Note} from "../../reducers";

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    paperMenu: {
        height: "100vh",
        marginRight: theme.spacing(2),
        borderRadius: "0",
        backgroundColor: "#F9F9FC"
    },
    menuTitle: {
        fontSize: "11px",
        fontWeight: 600,
        color: "#AAAAAA",
        margin: "13px 0 16px 16px"
    },
    menuItem: {
        display:"flex",
        justifyContent:"space-between",
        fontSize: "14px",
        fontWeight: 400,
        height: "32px",
        "&:hover ": {
            backgroundColor: "#EDEDED"
        }
    },
    menuSelectedItem: {
        backgroundColor: "#EDEDED !important"
    },
    menuAddItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "35px",
        "&:hover": {
            backgroundColor: `${green[100]} !important`
        }
    },
    menuDeleteItem: {
        color: "#666666",
        backgroundColor: "#D4D4D4",
        fontSize: "20px"
    },
    unnamedNote: {
        color: "#AAAAAA"
    },
    contentContainer: {
      backgroundColor: "white"
    },
    contentBlock: {
        marginTop: theme.spacing(20)
    },
    savingBlock: {
        marginTop: "25px",
        display: "none", // place "flex" here
        alignItems: "center",
        justifyContent: "flex-start",
    },
    submitButton: {
        width: "150px !important"
    },
    savedMessage: {
        fontSize: "14px",
        marginLeft: "15px",
        color: green[300]
    }
});

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
        return this.state.notes.find((el) => el.id === id) //
    }

    unselectCurrentNote = () => {
        const current_note: Note|undefined = this.findNoteById(this.state.current_note_id)
        if (current_note) {
            current_note.selected = false; // LMAO, 'small brain solution' works! Sorry Abramov,
                                           // but I think I've just found a bug. No warning received in the console.
                                           // No worries, I used map function to change notes in other methods.
        }
    }

    onAddNote = (dispatch: Function) => {
        const new_id = this.state.id_counter+1;
        const new_note: Note = {id: new_id, title: `New note (${new_id})`, content:'', selected: true}
        this.unselectCurrentNote();
        dispatch({type: "addNote", value: new_note})
        this.setState({
            id_counter: new_id,
            current_note_id: new_id,
            notes: [
                ...this.state.notes,
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
                notes: new_notes
            })
        }
    }

    onSelectNote = (event: React.MouseEvent<HTMLElement>,notes: [], id: number) => {
        const this_note: Note|undefined = this.findNoteById(id);
        if (this_note) {
            this.unselectCurrentNote();
            this_note.selected = true
            this.setState({
                current_note_id: id,
                show_saved: false
            })
        }
    }

    onSubmit = (current_note: Note|undefined, dispatch: Function) => {
        if (current_note) {
            dispatch({type: "updateContent", value: current_note.content, id: current_note.id})
            this.setState({
                show_saved: true
            })
        }
    }

    onTitleChange = (event: React.ChangeEvent<HTMLInputElement>, current_note: Note|undefined, dispatch: Function) => {
        if (current_note) {
            let value_to_safe = event.currentTarget.value;
            dispatch({type: "updateTitle", value: value_to_safe, id: current_note.id})
            this.setState({
                show_saved: false,
                notes: this.state.notes.map((el: Note) => (el.id === current_note.id ?
                                                            {...el, title: value_to_safe} : el)) // Big brain solution!
            })
        }
    }

    onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>, current_note: Note|undefined) => {
        if (current_note) {
            let value_to_safe = event.currentTarget.value;
            this.setState({
                show_saved: false,
                notes: this.state.notes.map((el: Note) => (el.id === current_note.id ?
                                                            {...el, content: value_to_safe} : el))
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
                                <MenuItem key={el.id}
                                          className={classes.menuItem}
                                          classes={{ selected: classes.menuSelectedItem}}
                                          selected={el.selected}
                                          onClick={(event) =>
                                              this.onSelectNote(event,notes,el.id)}>
                                    {el.title ? el.title : <span className={classes.unnamedNote}>Unnamed note</span>}
                                    {el.selected ? <DeleteIcon key={el.id}
                                                               onClick={() => this.onDeleteNote(current_note, dispatch)}
                                                               className={classes.menuDeleteItem} /> : ""}

                                </MenuItem>
                            )) : ""}
                            <MenuItem className={classes.menuAddItem} onClick={() => this.onAddNote(dispatch)}>
                                <AddBoxIcon/>
                            </MenuItem>
                        </MenuList>
                    </Paper>
                </Grid>
                <Grid sm={9} item>
                    <Container component="main" maxWidth="sm">
                        {current_note ? <div className={classes.contentBlock}>
                            <TitleInput onChange={(event) => {
                                this.onTitleChange(event, current_note, dispatch)
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