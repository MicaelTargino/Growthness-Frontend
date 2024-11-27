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
import { createExerciseLog } from "../services/ExercisesService";
import { ExercisesDatePickerDemo } from "./ExerciseLogsDatePicker";

function removeEmptyValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null && value !== "")
  );
}

export default function CreateExerciseLogDialog({ routineExerciseId, exerciseType }) {
  const [formData, setFormData] = useState({
    weight: "",
    reps: "",
    distance_logged: "",
    pace_logged: "",
    average_velocity_logged: "",
    date_logged: new Date(),
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    if (!date) return;
    const updatedDate = new Date(date);
    updatedDate.setHours(12, 0, 0, 0);
    setFormData({
      ...formData,
      date_logged: updatedDate,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (exerciseType === "gym") {
      newErrors.weight = formData.weight.trim() === "";
      newErrors.reps = formData.reps.trim() === "";
    } else if (exerciseType === "cardio") {
      newErrors.distance_logged = formData.distance_logged.trim() === "";
      newErrors.pace_logged =
        formData.pace_logged.trim() === "" && formData.average_velocity_logged.trim() === "";
    }
    newErrors.date_logged = !formData.date_logged;
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const date = formData.date_logged;
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const logData = {
        ...formData,
        date_logged: formattedDate,
        routine_exercise: routineExerciseId,
      };

      const cleanedLogData = removeEmptyValues(logData);

      await createExerciseLog(cleanedLogData);
      setSubmitError(null);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating exercise log:", error);
      setSubmitError("Erro ao registrar log de exercício. Por favor, tente novamente.");
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
            {exerciseType === "gym" && (
              <div className="flex gap-2">
                <div className="flex flex-col items-start gap-1">
                  <Label htmlFor="weight">Peso (kg)<span className="text-red-600">*</span></Label>
                  <Input
                    type="number"
                    id="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="80"
                    className={errors.weight ? "border-red-500" : ""}
                  />
                  {errors.weight && <span className="text-red-500">Peso é obrigatório</span>}
                </div>
                <div className="flex flex-col items-start gap-1">
                  <Label htmlFor="reps">Repetições<span className="text-red-600">*</span></Label>
                  <Input
                    type="number"
                    id="reps"
                    value={formData.reps}
                    onChange={handleChange}
                    placeholder="10"
                    className={errors.reps ? "border-red-500" : ""}
                  />
                  {errors.reps && <span className="text-red-500">Repetições são obrigatórias</span>}
                </div>
              </div>
            )}

            {exerciseType === "cardio" && (
              <>
                <div className="flex flex-col items-start gap-1">
                  <Label htmlFor="distance_logged">Distância (km)<span className="text-red-600">*</span></Label>
                  <Input
                    type="number"
                    id="distance_logged"
                    value={formData.distance_logged}
                    onChange={handleChange}
                    placeholder="5"
                    className={errors.distance_logged ? "border-red-500" : ""}
                  />
                  {errors.distance_logged && <span className="text-red-500">Distância é obrigatória</span>}
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col items-start gap-1">
                    <Label htmlFor="pace_logged">Ritmo (min/km)</Label>
                    <Input
                      type="number"
                      id="pace_logged"
                      value={formData.pace_logged}
                      onChange={handleChange}
                      placeholder="6"
                      className={errors.pace_logged && !formData.average_velocity_logged ? "border-red-500" : ""}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <Label htmlFor="average_velocity_logged">Velocidade Média (km/h)</Label>
                    <Input
                      type="number"
                      id="average_velocity_logged"
                      value={formData.average_velocity_logged}
                      onChange={handleChange}
                      placeholder="10"
                      className={errors.average_velocity_logged && !formData.pace_logged ? "border-red-500" : ""}
                    />
                  </div>
                </div>
                {errors.pace_logged && errors.average_velocity_logged && (
                  <span className="text-red-500">Insira o ritmo ou a velocidade média</span>
                )}
              </>
            )}

            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="date_logged">Data<span className="text-red-600">*</span></Label>
              <ExercisesDatePickerDemo
                description="Data"
                placeholder="Selecione a data"
                selectedDate={new Date(formData.date_logged).toISOString()}
                onDateChange={handleDateChange}
              />
              {errors.date_logged && <span className="text-red-500">Data é obrigatória</span>}
            </div>
          </div>

          {submitError && <div className="text-red-500 text-sm mt-2">{submitError}</div>}

          <DialogFooter>
            <Button type="submit" className="bg-blue-500 w-full">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
