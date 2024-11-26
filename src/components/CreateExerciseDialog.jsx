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
import { createExercise } from "../services/ExercisesService";
import { useNavigate } from "react-router-dom";

export default function CreateExerciseDialog({ routineId }) {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    exercise_type: "cardio", // Default to cardio
    day_of_week: "monday", // Default to Monday
    duration: "",
    distance: "",
    average_velocity: "",
    pace: "",
    weight_goal: "",
    reps_goal: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    name: false,
    exercise_type: false,
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
      exercise_type: !["cardio", "gym"].includes(formData.exercise_type),
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
      const res = await createExercise(formData, routineId); // Pass routineId to createExercise
      setSubmitError(null); // Clear any previous error
      setOpen(false); // Close the modal
      navigate(`/exercise/${res.id}`);
    } catch (error) {
      console.error("Error creating exercise:", error);
      setSubmitError("Erro ao criar exercício. Por favor, tente novamente.");
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
          <DialogTitle>Criar Exercício</DialogTitle>
          <DialogDescription>
            Preencha os dados do seu novo exercício.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 py-4">
            {/* Name Field */}
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="name" className="text-right">
                Nome<span className="text-red-600">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Corrida, Levantamento de peso, etc."
                className={`col-span-3 focus:border-blue-700 ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <span className="text-red-500">Nome é obrigatório</span>
              )}
            </div>

            {/* Exercise Type Field */}
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="exercise_type" className="text-right">
                Tipo de Exercício<span className="text-red-600">*</span>
              </Label>
              <select
                id="exercise_type"
                value={formData.exercise_type}
                onChange={handleChange}
                className="col-span-3 border w-full rounded px-3 py-2"
              >
                <option value="cardio">Cardio</option>
                <option value="gym">Musculação</option>
              </select>
            </div>

            {/* Day of the Week */}
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="day_of_week" className="text-right">
                Dia da Semana<span className="text-red-600">*</span>
              </Label>
              <select
                id="day_of_week"
                value={formData.day_of_week}
                onChange={handleChange}
                className="col-span-3 border w-full rounded px-3 py-2"
              >
                <option value="monday">Segunda-feira</option>
                <option value="tuesday">Terça-feira</option>
                <option value="wednesday">Quarta-feira</option>
                <option value="thursday">Quinta-feira</option>
                <option value="friday">Sexta-feira</option>
                <option value="saturday">Sábado</option>
                <option value="sunday">Domingo</option>
              </select>
            </div>

            {/* Cardio Fields */}
            {formData.exercise_type === "cardio" && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-start gap-1">
                  <Label htmlFor="duration" className="text-right">
                    Duração (min)
                  </Label>
                  <Input
                    type="number"
                    id="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="30"
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Label htmlFor="distance" className="text-right">
                    Distância (km)
                  </Label>
                  <Input
                    type="number"
                    id="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    placeholder="5"
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Label htmlFor="average_velocity" className="text-right">
                    Velocidade Média (km/h)
                  </Label>
                  <Input
                    type="number"
                    id="average_velocity"
                    value={formData.average_velocity}
                    onChange={handleChange}
                    placeholder="10"
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Label htmlFor="pace" className="text-right">
                    Ritmo (min/km)
                  </Label>
                  <Input
                    type="text"
                    id="pace"
                    value={formData.pace}
                    onChange={handleChange}
                    placeholder="6:00"
                  />
                </div>
              </div>
            )}

            {/* Gym Fields */}
            {formData.exercise_type === "gym" && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-start gap-1">
                  <Label htmlFor="weight_goal" className="text-right">
                    Meta de Peso (kg)
                  </Label>
                  <Input
                    type="number"
                    id="weight_goal"
                    value={formData.weight_goal}
                    onChange={handleChange}
                    placeholder="50"
                  />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Label htmlFor="reps_goal" className="text-right">
                    Meta de Repetições
                  </Label>
                  <Input
                    type="number"
                    id="reps_goal"
                    value={formData.reps_goal}
                    onChange={handleChange}
                    placeholder="10"
                  />
                </div>
              </div>
            )}
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
