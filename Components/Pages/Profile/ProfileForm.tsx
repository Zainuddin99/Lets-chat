import { FormEvent } from "react";

import classes from "./profile.module.scss";
import { useInputs } from "../../../customHooks/useInputs";
import { UserState } from "../../../TS Types/redux.types";
import { updateProfileData } from "../../../Firebase/Database/users";
import { handleError } from "../../../utils/handleError";
import { notify } from "../../../utils/notify";
import { isObjectsEqual } from "../../../utils/functions";
import { dispatch } from "../../../Redux/store";
import { userActions } from "../../../Redux/users";
import InputHandler from "../../Reusable/FormElements/InputHandler";
import combineClasses from "../../../utils/combineClasses";

type Props = {
    userData: UserState;
};

function ProfileForm({ userData }: Props) {
    const initialInputsData = {
        nickName: {
            value: "",
        },
        firstName: {
            value: userData.firstName,
            required: true,
        },
        lastName: {
            value: userData.lastName,
            required: true,
        },
        email: {
            value: userData.email,
            required: true,
            isEmail: true,
        },
        bio: {
            value: userData.bio,
        },
    };

    const [
        inputs,
        handleInputsChange,
        setInputs,
        { extras, validate, initialInputs },
    ] = useInputs(initialInputsData);

    const formItems = [
        {
            placeholder: "First name",
            name: "firstName",
        },
        {
            placeholder: "Last name",
            name: "lastName",
        },
        {
            element: "textarea",
            placeholder: "Your bio",
            name: "bio",
            rows: 5,
        },
    ] as const;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            await updateProfileData(inputs);
            dispatch(userActions.saveUser(inputs));
            notify("success", "Successfully updated");
        } catch (error: any) {
            handleError(error);
        }
    };

    const inputsChanged = !isObjectsEqual(inputs, initialInputs as object);

    return (
        <form
            onSubmit={handleSubmit}
            className={classes.form}
            autoComplete="off"
        >
            {formItems.map((item) => {
                return (
                    <InputHandler
                        onChange={handleInputsChange}
                        error={extras[item.name].isError}
                        message={extras[item.name].message}
                        value={inputs[item.name]}
                        key={item.name}
                        {...item}
                    />
                );
            })}

            <div>
                <div className={combineClasses("flex-fe-c gap")}>
                    <button
                        className="outlined"
                        disabled={!inputsChanged}
                        type="reset"
                        onClick={() => setInputs(initialInputs)}
                    >
                        Reset
                    </button>
                    <button
                        disabled={!inputsChanged}
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ProfileForm;
