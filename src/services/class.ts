// class/getAll


// export const getAllClass = async () => {
//     const toastId = toast.loading("Wait..");
//     try {
//         // console.log(process.env.REACT_APP_API_URL);
//         const response = await apiConnector('GET', `${URL}/class/getAll`);
        
//         if (!response) {
//             toast.error("Error in Attendance!");
//             return undefined; // Return undefined if response is not valid
//         }
        
//         return response.data; // Cast response.data to Student[]
//     } catch (error) {
//         console.log(error);
//         toast.error("An error occurred while save Attendance."); // Optional: Display an error toast
//         return undefined; // Return undefined in case of an error
//     } finally {
//         toast.dismiss(toastId);
//     }
// };