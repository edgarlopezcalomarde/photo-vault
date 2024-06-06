import { Button } from "@/components/ui/button";
import Camera from "@/components/ui/camera/camera";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CameraIcon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { Cancel } from "./lib/icons";


function App() {

  const [showDialog, setShowDialog] = useState(false);
  const [capturedImages, setCapturedImages] = useState<Array<string>>([]);

  return (
    <div className="max-h-screen flex-1 h-screen  flex flex-col  lg:flex-row p-4 gap-4">
      <div className="flex-grow flex flex-1 flex-col rounded-lg border border-dashed shadow-sm items-center justify-center overflow-auto">
        {capturedImages.length > 0 && (
          <div className="grid w-full h-full grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {capturedImages.map((image, index) => (
              <div key={index} className="relative h-full">
                <button
                  className="absolute bg-red-500 text-white h-[30px] w-[30px] rounded-full flex justify-center items-center top-1 left-1"
                  onClick={() => handleRemoveInMemoryImage(index)}
                >
                  <Cancel />
                </button>
                <img
                  src={image}
                  alt="Captured image"
                  className="aspect-video rounded-md object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Dialog
          open={showDialog}
          onOpenChange={(open) => setShowDialog(open)}
        >
          <DialogTrigger asChild>
            <Button variant="outline">
              <CameraIcon className="mr-2 h-5 w-5" />
              Realizar Captura
              <span className="sr-only">Capturar</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="h-svh w-svw max-w-full p-0">
            <Camera
              onClosed={() => {
                setShowDialog(false);
              }}
              onCapturedImages={(images) => {
                setCapturedImages(images);
                setShowDialog(false);
              }}
            />
          </DialogContent>
        </Dialog>


        <Button variant="default">
          <UploadIcon className="mr-2 h-5 w-5" />
          <label htmlFor="file-upload">
            Subir archivos
            <input
              accept="image/*"
              className="sr-only"
              id="file-upload"
              multiple
              type="file"
            />
          </label>
        </Button>
        <Button variant="default">
          Guardar
        </Button>

      </div>
    </div>

  )


  function handleRemoveInMemoryImage(index: number) {
    setCapturedImages(images => images.filter((_image, i) => i !== index))
  }
}

export default App
