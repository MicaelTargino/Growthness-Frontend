import { useState } from "react";
import { PlusSquareIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { createExerciseLog } from "../services/ExercisesService"; // Update to use Exercise service
import { useNavigate } from "react-router-dom";
import { DatePickerDemo } from "./DatePicker";
import { formatDate } from "date-fns";
import { ExercisesDatePickerDemo } from "./ExerciseLogsDatePicker";

export default function CreateExerciseLogDialog({ routineExerciseId }) {
  const navigate = useNavigate();

  // State for form data, including weight, reps, and date_logged
  const [formData, setFormData] = useState({
    weight: "",  // For gym exercises
    reps: "",    // For gym exercises
    date_logged: new Date(),  // Store Date object initially
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    weight: false,
    reps: false,
    date_logged: false,
  });

  // State for submission error messages
  const [submitError, setSubmitError] = useState(null);

  // State to manage dialog open/close
  const [open, setOpen] = useState(false);

  // Function to update form data for non-date fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    if (!date) return;
  
    // Ensure the time is set to 12:00 PM
    const updatedDate = new Date(date);
    updatedDate.setHours(12, 0, 0, 0); // Set the time to 12:00:00 (midday) to avoid timezone shifting issues
  
    // No need to format the date, we use the Date object directly
    setFormData({
      ...formData,
      date_logged: updatedDate,  // Store the Date object with 12:00 PM as time
    });
    
    console.log(updatedDate); // Optionally log the updated date for debugging
  };

  // Function to validate form
  const validateForm = () => {
    const newErrors = {
      weight: formData.weight.trim() === "",  // Validate weight is not empty
      reps: formData.reps.trim() === "",  // Validate reps is not empty
      date_logged: !formData.date_logged,  // Validate date is selected
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);  // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return; // Don't submit if validation fails
    }
  
    try {
      // Format the date_logged field to "YYYY-MM-DD"
      const date = formData.date_logged;
      const formattedDate =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0");
  
      const logData = {
        ...formData,
        date_logged: formattedDate, // Use the formatted date
        routine_exercise: routineExerciseId, // Pass the routine exercise ID
      };
  
      const res = await createExerciseLog(logData); // Submit form data to API
      setSubmitError(null); // Clear any previous error
      setOpen(false); // Close the modal
      window.location.reload(); // Temporary solution until Redux or state management is used
    } catch (error) {
      console.error("Error creating exercise log:", error);
      setSubmitError(
        "Erro ao registrar log de exercício. Por favor, tente novamente."
      ); // Show error in modal
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PlusSquareIcon
          size={26}
          className="text-[#417ff6] cursor-pointer hover:scale-105"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle>Registrar Exercício</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do seu exercício realizado.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex gap-2">
              <div className="flex flex-col items-start gap-1">
                <Label htmlFor="weight" className="text-right">
                  Peso (kg)<span className="text-red-600">*</span>
                </Label>
                <Input
                  type="number"
                  id="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="80"
                  className={`col-span-3 focus:border-blue-700 ${
                    errors.weight ? "border-red-500" : ""
                  }`}
                />
                {errors.weight && (
                  <span className="text-red-500">Peso é obrigatório</span>
                )}
              </div>
              <div className="flex flex-col items-start gap-1">
                <Label htmlFor="reps" className="text-right">
                  Repetições<span className="text-red-600">*</span>
                </Label>
                <Input
                  type="number"
                  id="reps"
                  value={formData.reps}
                  onChange={handleChange}
                  placeholder="10"
                  className={`col-span-3 focus:border-blue-700 ${
                    errors.reps ? "border-red-500" : ""
                  }`}
                />
                {errors.reps && (
                  <span className="text-red-500">Repetições são obrigatórias</span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="date_logged" className="text-right">
                Data<span className="text-red-600">*</span>
              </Label>
              <ExercisesDatePickerDemo
                description="Data"
                placeholder="Selecione a data"
                selectedDate={new Date(formData.date_logged).toISOString()}  // Use new Date to convert string back to Date object
                onDateChange={handleDateChange}
              />
              {errors.date_logged && (
                <span className="text-red-500">Data é obrigatória</span>
              )}
            </div>
          </div>

          {/* Error message display */}
          {submitError && (
            <div className="text-red-500 text-sm mt-2">{submitError}</div>
          )}

          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-500 hover:scale-105 transition-all w-full rounded-xl px-5 py-3 text-white"
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
