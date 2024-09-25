// import { Suggestions } from '@/app/(auth-pages)/account/components/suggestions'
// import React from 'react'
// import { Input } from './ui/input'

// const AddressSuggestion = () => {
//     return (
//         <div className="relative mb-[167px]">
//             <Input
//                 {...register("address")}
//                 placeholder="Sisesta aadress"
//                 onChange={handleInputChange}
//                 value={inputValue}
//                 autoComplete="off"
//             />
//             <Suggestions
//                 isLoading={isLoading}
//                 suggestions={suggestions}
//                 showSuggestions={showSuggestions}
//                 inputValue={inputValue}
//                 setChosenSuggestion={setChosenSuggestion}
//                 setInputValue={setInputValue}
//                 id={id}
//             />
//             <p className="italic text-sm pl-1 pt-1 text-slate-700">Naide: Tamme 5</p>
//             {errors.address && <p className="text-red-500">{errors.address.message}</p>}
//         </div>
//     )
// }

// export { AddressSuggestion }