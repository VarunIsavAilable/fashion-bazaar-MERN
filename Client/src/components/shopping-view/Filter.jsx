import { filterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function ProductFilter({ filters, handleFilter }) {
    console.log("hy")
  return (
    <div className='rounded-lg shadow-sm w-55'>
        <div className='p-4 border-b'>
            <h2 className='text-lg font-extrabold'>Filters</h2>
        </div>

        <div className='p-4 space-y-4'>
            {
                Object.keys(filterOptions).map(keyItem=>
                    <Fragment>
                        <div>
                            <h3 className='font-bold'>{keyItem}</h3>
                            <div className='grid gap-2 mt-2'>
                                {
                                    filterOptions[keyItem].map(option=>
                                        <Label key={option.id} className='flex items-center gap-2 font-medium'>
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
