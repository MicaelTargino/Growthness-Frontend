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
import { createHabit, createHabitLog } from "../services/HabitsService";
import { useNavigate } from "react-router-dom";
import { DatePickerDemo } from "./DatePicker";

export default function CreateHabitLogDialog({ measure, type, habitId }) {
  const navigate = useNavigate();

  // State for form data, including goal and dateRefered
  const [formData, setFormData] = useState({
    goal: "",
    measure: measure,
    dateRefered: new Date().toISOString(),  // New field to store the selected date
    frequencia: type === "daily" ? "1" : type === "weekly" ? "2" : "3",  // Frequency based on type
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    goal: false,
    dateRefered: false,
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

  // Function to update the selected date
  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      dateRefered: date,
    });
  };

  // Function to validate form
  const validateForm = () => {
    const newErrors = {
      goal: formData.goal.trim() === "",  // Validate goal is not empty
      dateRefered: formData.dateRefered === null || formData.dateRefered.trim() === "",  // Validate date is selected
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);  // Return true if no errors
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Don't submit if validation fails
    }


    try {
      const res = await createHabitLog(formData, habitId);  // Submit form data to API
      setSubmitError(null); // Clear any previous error
      setOpen(false); // Close the modal
      window.location.reload() // this is a temporaly solution, while I dont setup Redux;
    } catch (error) {
      console.error("Error creating habit log:", error);
      setSubmitError("Erro ao registrar realização. Por favor, tente novamente."); // Show error in modal
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
          <DialogTitle>Registrar realização</DialogTitle>
          <DialogDescription>
            Preencha se você já realizou seu hábito.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex gap-2">
              <div className="flex flex-col items-start gap-1">
                <Label htmlFor="goal" className="text-right">
                  Valor<span className="text-red-600">*</span>
                </Label>
                <Input
                  type="number"
                  id="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  placeholder="4"
                  className={`col-span-3 focus:border-blue-700 ${
                    errors.goal ? "border-red-500" : ""
                  }`}
                />
                {errors.goal && (
                  <span className="text-red-500">Valor é obrigatório</span>
                )}
              </div>
              <div className="flex flex-col items-start gap-1">
                <Label htmlFor="measure" className="text-right">
                  Medida
                </Label>
                <Input
                  id="measure"
                  value={measure}
                  onChange={handleChange}
                  disabled
                  className={`col-span-3 focus:border-blue-700 ${
                    errors.measure ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="dateRefered" className="text-right">
                Data<span className="text-red-600">*</span>
              </Label>
              <DatePickerDemo
                description="Data"
                placeholder="Selecione a data"
                selectedDate={formData.dateRefered}
                onDateChange={handleDateChange}
              />
              {errors.dateRefered && (
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
