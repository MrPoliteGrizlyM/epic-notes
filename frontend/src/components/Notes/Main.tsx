import React, {Component} from 'react';
import {Theme, WithStyles, Paper, MenuList, MenuItem, Grid, Container} from "@material-ui/core";
import {withStyles, createStyles} from "@material-ui/core/styles";
import AddBoxIcon from '@material-ui/icons/AddBox';
import green from '@material-ui/core/colors/green';
import {ContentTextarea, TitleInput} from "../../elements/inputs";
import { SubmitButton } from "../../elements/buttons";

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
    contentContainer: {
      backgroundColor: "white"
    },
    contentBlock: {
        marginTop: theme.spacing(20)
    },
    submitButton: {
        marginTop: "25px",
        width: "150px !important"
    }
});

interface Props extends WithStyles<typeof styles> {}
type State = {

}

class Main extends Component<Props, State> {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid sm={3}>
                    <Paper className={classes.paperMenu}>
                        <MenuList>
                            <p className={classes.menuTitle}>Notes</p>
                            <MenuItem className={classes.menuItem}
                                      classes={{ selected: classes.menuSelectedItem}}
                                      selected={true}>Profile</MenuItem>
                            <MenuItem className={classes.menuItem}
                                      classes={{ selected: classes.menuSelectedItem}}
                                      selected={false}>Profile</MenuItem>
                            <MenuItem className={classes.menuItem}
                                      classes={{ selected: classes.menuSelectedItem}}
                                      selected={false}>Profile</MenuItem>

                            <MenuItem className={classes.menuAddItem}>
                                <AddBoxIcon/>
                            </MenuItem>
                        </MenuList>
                    </Paper>
                </Grid>
                <Grid sm={9}>
                    <Container component="main" maxWidth="sm">
                        <div className={classes.contentBlock}>
                            <TitleInput onChange={() => {}} value={""} placeholder={"Note Title"}/>
                            <ContentTextarea aria-label="textarea" placeholder="Content"/>
                            <SubmitButton className={classes.submitButton}>Save</SubmitButton>
                        </div>
                    </Container>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Main);