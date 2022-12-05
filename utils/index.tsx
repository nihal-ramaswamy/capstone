export const updateObjState = (setter, model, prop, val) => {
    let _model = Object.assign({}, model)
    _model[prop] = val
    setter(_model)
}
export const updateArrOfObjState = (setter, model, index, prop, val) => {
    let _model = [...model]
    _model[index] = Object.assign({}, _model[index], { [prop]: val })
    setter(_model)
}



export const createFillableModel = model => {
    const fillableModel: string[] = [];
    let fields = model.fields
    for(let field in fields){
        let fld = fields[field]
        fillableModel.push({...fld, value: fld.type === "multioption-singleanswer" || fld.type === "multioption-multianswer" ? [] : ""})
    }
    return fillableModel
}

export type submit = {
    title : string,
    value : string | number,
    type : string,
}

export const createSubmitableModel = fields => {
    const submitableModel: submit[] = [];
    for(let field in fields){
        let fld = fields[field]

        if(!fld.value || fld.value.length < 1) continue
        
        let fieldModel = {
            title: fld.title,
            value: fld.value,
            type: fld.type
        }
        submitableModel.push(fieldModel)
    }
    return submitableModel
}

export const hasError = fields => {
    for(let field of fields){
        if(!field.required) continue

        if(["short-text", "long-text", "number", "file"].indexOf(field.type) > -1){
            if(field.required && !field.value.trim()) return `'${field.title}' is a required field`
        }else{
            if(field.required && field.value.length < 1) return `'${field.title}' is a required field`
        }
    }
    return false
}
