import { createSlice } from '@reduxjs/toolkit'

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanyByText:""
    },
    reducers:{
        //actions

        setSingleCompany:(state,action) =>{
            console.log("DISPATCHING setSingleCompany", action.payload);
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action) =>{
            state.companies = action.payload;
        },
        setsearchCompanyByText:(state,action) =>{
            state.searchCompanyByText = action.payload;
        }
    }
});

export const {setSingleCompany, setCompanies,setsearchCompanyByText} = companySlice.actions;
export default companySlice.reducer