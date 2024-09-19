
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { HiMiniPlusSmall } from "react-icons/hi2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import  {useState} from 'react';
import { loadUsers } from '../../../utils/LoadUsers'

function PublicationForm() {
    const[text, setText]=useState('')
    const[image, setImage]=useState('')

    const handleSubmit= async(e) =>
        {
            e.preventDefault();
            const users = await loadUsers();
            const user = users[0];
            const userId= user.id;

          
           const formData = new FormData();
            formData.append('content', text);
            formData.append('image', image); // agregar archivo de imagen
            formData.append('user', userId);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts/`, {
                    method: "POST",
                    body: formData,
                    
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    console.error("Error:", errorData);
                    throw new Error(`Error ${res.status}: ${res.statusText}`);
                }
        
                const data = await res.json();
                console.log(data);
            } catch (error) {
                console.error("Error submitting the form:", error);
            }
            
        };

    return (
        
            <AlertDialog>
                <AlertDialogTrigger><HiMiniPlusSmall size={'35px'} color="#414141"/></AlertDialogTrigger>
                <AlertDialogContent className="text-white bg-black">
                    <form onSubmit={handleSubmit}>

                        <AlertDialogHeader className="items-center justify-center">
                            <AlertDialogTitle>Create a new publication</AlertDialogTitle>
                        </AlertDialogHeader>

                        {/*Form*/}
                        <AlertDialogDescription>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="text">Text</Label>
                                    <textarea className="bg-black text-white border-solid" id="text" placeholder="publication content" 
                                        onChange={e=> setText(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="image">Image</Label>
                                    <Input id="image" type="file"  
                                        onChange={(e)=> setImage(e.target.files[0])}
                                    />
                                </div>
                                
                            </div>
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="bg-black text-white">Cancel</AlertDialogCancel>
                            <AlertDialogAction type="submit" >Publish</AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogContent>
            </AlertDialog>
            
       

    );}

    export default PublicationForm;