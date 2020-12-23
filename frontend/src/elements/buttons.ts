import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const buttonBase = {
    backgroundColor: "#E3E5EE",
    border: 0,
    borderRadius: 2,
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.05), 1px 4px 5px rgba(0, 0, 0, 0.02)",
    color: 'black',
    height: 35,
    width: "100%",
    fontSize: "14px",
    fontWeight: 500,
    '&:hover': {
        backgroundColor: "#DDE1F0",
    }
};

const SubmitButton = styled(Button)({
    ...buttonBase
});

export {SubmitButton}