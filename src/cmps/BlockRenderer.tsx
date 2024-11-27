import { Gallery } from "./Gallery";
import { List } from "./blocks/List";
import { Img } from "./blocks/Img";
import { TextArea } from "./blocks/TextArea";
import { Text } from "./blocks/Text";
import { Input } from "./blocks/Input";
import { YouTubeVideo } from "./YouTubeVideo";

export type Block = {
  id: number;
  block_type: string;
  content: string;
};

// block types: input, text, gallery, list, image, textarea

export const BlockRenderer = async ({ block }: { block: Block }) => {
  switch (block.block_type) {
    case "input":
      return <Input block={block} />;
    case "text":
      return <Text block={block} />;
    case "gallery": {
      let images: string[] = [];
      try {
        images = JSON.parse(block.content || "[]");
      } catch (error) {
        console.error("Failed to parse gallery content:", error);
      }
      return (
        <div className="animate-fade-in my-3">
          <Gallery images={images} />
        </div>
      );
    }
    case "list": {
      let listItems: string[] = [];
      try {
        listItems = JSON.parse(block.content || "[]");
      } catch (error) {
        console.error("Failed to parse list content:", error);
      }
      return <List listItems={listItems} />;
    }
    case "image":
      return <Img src={block.content} />;
    case "textarea":
      return <TextArea block={block} />;
      case 'video':
        return <YouTubeVideo  videoId="" />    
     
    default:
      return null;
  }
};
