import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

export const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    paperMenu: {
        height: "100vh",
        marginRight: theme.spacing(2),
        borderRadius: "0",
        backgroundColor: "#F9F9FC"
    },
    menuItemBox: {
        display: "flex",
    },
    menuTitle: {
        fontSize: "11px",
        fontWeight: 600,
        color: "#AAAAAA",
        margin: "13px 0 16px 16px"
    },
    menuSelectItem: {
        display:"flex",
        justifyContent:"space-between",
        fontSize: "14px",
        fontWeight: 400,
        height: "32px",
        width: "100%",
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
        fontSize: "20px",
        height: "32px",
        width: "35px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: `${red[200]} !important`
        },
        [theme.breakpoints.down('xs')] : {
            height: "48px",
        }
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
        display: "flex",
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