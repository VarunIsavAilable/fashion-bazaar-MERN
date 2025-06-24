import { Label } from '@radix-ui/react-label'
import React from 'react'
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { SelectItem } from '@radix-ui/react-select';

export default function CommonForm({formControls, formData, setFormData, onSubmit, buttonText}) {

    function renderInputesByComponentType(getControlItem){
        let element = null
        const value = formData[getControlItem.name] || ''





        switch (getControlItem.componentType) {
            case 'input':
                element = <Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={value}
                    onChange={event=>setFormData({
                        ...formData, 
                        [getControlItem.name]: event.target.value
,
                    })}
                />
                
                break;

            case 'select':
                element = 
                <Select onValueChange={(value)=> setFormData({
                    ...formData,
                    [getControlItem.name]: value
                })} value={value}>
                    <SelecTriger className='w-full'>
                        <SelectValue placeholder={getControlItem.placeholder}/>
                    </SelecTriger>

                    <SelectContent>
                        {
                            getControlItem.options &&
                            getControlItem.options.length > 0 ?
                            getControlItem.options.map(optionItem => 
                                <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>
                            ) : null
                        }
                    </SelectContent>
                </Select>
                
                break;

            case 'textarea':
                element = <Textarea
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    // type={getControlItem.type}
                    value={value}
                />
                
                break;
        
            default:
                element = <Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={value}
                    onChange={event=>setFormData({
                        ...formData, 
                        [getControlItem.name]: event.target.value
,
                    })}
                />
                break;
        }

        return element
    }
    

  return (
    <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-3'>
            {
                formControls.map(controlItem => 
                    <div className='grid w-full gap-1.5' key={controlItem.name}>
                        <Label className='mb-1'>{controlItem.label}</Label>
                        {
                            renderInputesByComponentType(controlItem)
                        }
                    </div>
                )
            }
        </div>
        <button type='submit' className='mt-2 w-full text-white'>{buttonText || 'Submit'}</button>
    </form>
  )
}
