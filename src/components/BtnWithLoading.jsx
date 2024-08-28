import { useState } from "react";
const BtnWithLoading = ({defaultInnerElement, afterInnerElement, actionCallback}) => {
    const [btnState, setBtnState] = useState('default'); // default, loading or after

    const renderInnerHTML = () => {

        if(btnState == 'default') {
            return defaultInnerElement;
        } else if (btnState == 'loading') {
            return (
                <div class="loader">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            )
        } else if (btnState == 'after') {
            return afterInnerElement;
        }
    }

    // const actionCallback = async () => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(); // Resolving after 1 second to simulate an async operation
    //         }, 1000);
    //     });
    // }

    const handleFlow = async () => {
        if (btnState == 'default') {
            setBtnState('loading');
            
            // fetch api   
            await actionCallback();
            setBtnState('after')
        }

    }

    return (
        <button type="submit" onClick={handleFlow} className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150">
            {/* Enviar email */}
            { renderInnerHTML() }
        </button>
    )
}

export default BtnWithLoading;