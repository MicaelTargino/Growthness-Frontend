import { useState } from "react";
import { PlusSquareIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { createHabit } from "../services/HabitsService";
import { useNavigate } from "react-router-dom";

export default function CreateHabitDialog({ type }) {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    goal: "",
    measure: "",
    frequencia: type === "daily" ? "1" : type === "weekly" ? "2" : "3",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    name: false,
    goal: false,
    measure: false,
  });

  // State for submission error messages
  const [submitError, setSubmitError] = useState(null);

  // State to manage dialog open/close
  const [open, setOpen] = useState(false);

  // Function to update form data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Function to validate form
  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      goal: formData.goal.trim() === "",
      measure: formData.measure.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Don't submit if validation fails
    }

    try {
      formData['frequencies'] = [parseInt(formData.frequencia)];
      const res = await createHabit(formData);
      setSubmitError(null); // Clear any previous error
      setOpen(false); // Close the modal
      navigate(`/habit/${res.id}`)
    } catch (error) {
      console.error("Error creating habit:", error);
      setSubmitError("Erro ao criar hábito. Por favor, tente novamente."); // Show error in modal
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
      <DialogContent className="sm:max-w-[425px] bg-white rounded-xl ">
        <DialogHeader>
          <DialogTitle>Criar Hábito</DialogTitle>
          <DialogDescription>
            Preencha os dados do seu novo hábito.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="name" className="text-right">
                Nome<span className="text-red-600">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Beber Água"
                className={`col-span-3 focus:border-blue-700 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <span className="text-red-500">Nome é obrigatório</span>
              )}
            </div>
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
                  Medida<span className="text-red-600">*</span>
                </Label>
                <Input
                  id="measure"
                  value={formData.measure}
                  onChange={handleChange}
                  placeholder="litros"
                  className={`col-span-3 focus:border-blue-700 ${
                    errors.measure ? "border-red-500" : ""
                  }`}
                />
                {errors.measure && (
                  <span className="text-red-500">Medida é obrigatória</span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="frequencia" className="text-right">
                Frequência<span className="text-red-600">*</span>
              </Label>
              <select
                id="frequencia"
                value={formData.frequencia}
                onChange={handleChange}
                className="col-span-3 border w-full rounded px-3 py-2"
              >
                <option value="1">Diária</option>
                <option value="2">Semanal</option>
                <option value="3">Mensal</option>
              </select>
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
