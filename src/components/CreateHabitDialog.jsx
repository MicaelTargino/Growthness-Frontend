import { PlusSquareIcon } from "lucide-react"
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
 
export default function CreateHabitDialog({type}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PlusSquareIcon size={26} className="text-[#417ff6] cursor-pointer hover:scale-105" /> 
        {/* <Button variant="outline">Edit Profile</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-xl ">
        <DialogHeader>
          <DialogTitle>Criar Hábito</DialogTitle>
          <DialogDescription>
            Preencha os dados do seu novo hábito.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col items-start gap-1">
            <Label htmlFor="name" className="text-right">
              Nome<span className="text-red-600">*</span>
            </Label>
            <Input
              id="name"
              defaultValue="Beber Água"
              className="col-span-3 focus:border-blue-700"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col items-start gap-1">
                <Label htmlFor="name" className="text-right">
                    Valor<span className="text-red-600">*</span>
                </Label>
                <Input
                id="goal"
                defaultValue="4"
                className="col-span-3 focus:border-blue-700"
                />
            </div>
            <div className="flex flex-col items-start gap-1">
                <Label htmlFor="name" className="text-right">
                Medida<span className="text-red-600">*</span>
                </Label>
                <Input
                id="measure"
                defaultValue="litros"
                className="col-span-3 focus:border-blue-700"
                />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <Label htmlFor="frequencia" className="text-right">
              Frequência<span className="text-red-600">*</span>
            </Label>
            <select id="frequencia" className="col-span-3 border w-full rounded px-3 py-2">
              <option value="1">Diária</option>
              <option value="2">Semanal</option>
              <option value="3">Mensal</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-500 hover:scale-105 transition-all w-full rounded-xl px-5 py-3 text-white">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}