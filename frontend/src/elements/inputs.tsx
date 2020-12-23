import React from 'react';
import {TextareaAutosize} from "@material-ui/core";
import { makeStyles, styled } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const textInputStyles = makeStyles({
    root: {
        marginBottom: "20px"
    },
    label: {
        display: "block",
        fontSize: "16px",
        marginBottom: "11px",
        lineHeight: "0"
    },
    input: {
        fontSize: "16px",
        marginTop: "6px",
        padding: "5px",
        height: "30px",
        width: "100%",
        borderRadius: "2px",
        backgroundColor: "#F0F1F5",
        border: "1px solid #EAEAEA",
        outline: "none",
        transition: ".02s cubic-bezier(0.23, 1.05, 0.58, 1)",
        "&:hover": {
            backgroundColor: "#DCDEE6",
        },
        "&*:focus": {
            outline: "none"
        },
    },
    invalid: {
        border: `1px solid ${red[300]}`
    }
});

type TextInputProps = {
    label: string,
    type: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    valid: boolean
}

const TextInput = (props: TextInputProps) => {
    const classes = textInputStyles();
    return (
        <div className={classes.root}>
            <label className={classes.label} >{props.label}</label>
            <input type={props.type} className={props.valid ? classes.input : `${classes.input} ${classes.invalid}`}
                   onChange={props.onChange} value={props.value}/>
        </div>
    )
};

const titleInputStyles = makeStyles({
    root: {
        marginBottom: "20px"
    },
    input: {
        fontSize: "30px",
        fontWeight: 500,
        marginTop: "6px",
        height: "44px",
        width: "100%",
        border: "none",
        backgroundColor: "white",
        outline: "none",
        "&*:focus": {
            outline: "none"
        }
    }
});

type TitleInputProps = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    placeholder?: string
}

const TitleInput = (props: TitleInputProps) => {
    const classes = titleInputStyles();
    return <input className={classes.input} onChange={props.onChange} value={props.value} placeholder={props.placeholder}/>
};

const ContentTextarea = styled(TextareaAutosize)({
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: 500,
    width: "100%",
    border: "none",
    outline: "none",
    resize: "none",
})

export {TextInput, TitleInput, ContentTextarea}