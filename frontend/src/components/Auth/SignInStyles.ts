import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/core/styles";

export const styles = (theme: Theme) => createStyles({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(4, 0, 2),
    },
    error: {
        width: '100%'
    }
});