import { filterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function ProductFilter({ filters, handleFilter }) {
  return (
    <div className='rounded-sm shadow-sm w-[250px] [@media(max-width:426px)]:w-full'>
        <div className='p-4 border-b'>
            <h2 className='text-lg font-extrabold pt-1'>Filters</h2>
        </div>

        <div className='p-4 space-y-4 '>
            {
                Object.keys(filterOptions).map(keyItem=>
                    <Fragment>
                        <div>
                            <h3 className='font-bold'>{keyItem}</h3>
                            <div className='grid gap-2 mt-2 [@media(max-width:426px)]:grid-cols-2'>
                                {
                                    filterOptions[keyItem].map(option=>
                                        <Label key={option.id} className='flex items-center gap-2 font-medium '>
                                            <Checkbox 
                                            checked={
                                                filters && Object.keys(filters).length > 0 &&
                                                filters[keyItem] && filters[keyItem].indexOf(option.id) > -1
                                            }
                                            onCheckedChange={
                                                ()=>handleFilter(keyItem, option.id)
                                            }
                                            />
                                            {option.label}
                                        </Label>
                                    )
                                    
                                }
                            </div>
                        </div>
                        <Separator />
                    </Fragment>
                )
            }

        </div>
    </div>
  )
}
