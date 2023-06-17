import { useEffect } from 'react';

const useLog = (props: object) => {
    useEffect(() => {
        console.log(props);
    }, [props]);
};

export default useLog;
