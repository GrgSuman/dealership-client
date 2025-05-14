'use client'
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { saveVehicle } from "@/app/actions/user/user";
import { toast } from "sonner";

const SaveVehicle = ({ vehicleId, isSavedByUser }: { vehicleId: string, isSavedByUser: boolean }) => {
  const [isSaving, setIsSaving] = useState(false);

  const saveVehicleToUser = async () => {
    setIsSaving(true);
    await saveVehicle(vehicleId);
    setIsSaving(false);
  };

  return (
    <Button 
      onClick={saveVehicleToUser} 
      variant={isSavedByUser ? "destructive" : "outline"}
      className={`w-full ${
        isSavedByUser 
          ? "bg-red-100 hover:bg-red-200 text-red-700 border-red-200" 
          : ""
      }`}
      disabled={isSaving}
    >
      {isSaving ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Saving...</span>
        </div>
      ) : (
        isSavedByUser ? "Remove from favorites" : "Save for later"
      )}
    </Button>
  );
};

export default SaveVehicle;
