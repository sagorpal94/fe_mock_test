import {Card, CardContent} from "./ui/card.tsx";
import {FormData} from '../types';
import React, {useState} from "react";
import {Button} from "./ui/button.tsx";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "./ui/alert-dialog.tsx";
import {Trash2} from "lucide-react";

interface UserListProps {
    UserData: FormData[]
    setUserData: React.Dispatch<React.SetStateAction<FormData[]>>;
}

const UserList: React.FC<UserListProps> = ({UserData, setUserData}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

    const handleClearUserData = () => {
        if (showDeleteDialog) {
            setUserData([]);
            localStorage.removeItem('UserData');
            setShowDeleteDialog(false)
        }
    };

    const handlePopup = () => {
        setShowDeleteDialog(true);
    };


    return (
        <div className="space-y-4">

            {UserData.length > 0 && (
                <div className="mt-5">
                    <div className="flex justify-end items-center ">
                        <div className="flex space-x-2">
                            <Button
                                variant={"destructive"}
                                onClick={handlePopup}
                                className="px-4 py-2 rounded-md transition-colors cursor-pointer"
                            >
                                <Trash2 className="w-5 h-5"/>
                                Clear All User Data
                            </Button>
                        </div>
                    </div>
                </div>
            )}


            {UserData.map((submission) => (
                <Card key={submission.id} className="overflow-hidden border-0 shadow-md">
                    <div className="bg-primary h-2"/>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4 ">Personal Details</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm ">Name</p>
                                        <p className="font-medium">{submission.name}</p>
                                    </div>
                                    {submission.email && <div>
                                        <p className="text-sm ">Email</p>
                                        <p className="font-medium">{submission.email}</p>
                                    </div>}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4 ">Contact Information</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm ">Address</p>
                                        <p className="font-medium">{submission.address}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm ">Phone</p>
                                        <p className="font-medium">{submission.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            (submission.preferences && submission.preferences.length > 0) &&
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-3 ">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {submission.preferences?.map((category) => (
                                        <span key={category}
                                              className="px-3 py-1 bg-chart-4 rounded-full text-sm">
                                        {category}
                                    </span>
                                    ))}
                                </div>
                            </div>
                        }
                    </CardContent>
                </Card>
            ))}

            {/* Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to clear all user data?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClearUserData}>Ok</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default UserList;