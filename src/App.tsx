/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, Image, Spin, Tag } from "antd";

interface BookProps {
  brief?: string;
  categories?: string[];
  title?: string;
  uuid?: string;
  coverUrl?: string;
  author?: string;
}
// 渲染一本书
const Book = ({ brief, categories, ...props }: BookProps) => {
  if (!props.title) {
    return;
  }
  return (
    <div
      key={props.uuid}
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Image width={60} src={props.coverUrl}></Image>
        <div>
          <div style={{ fontWeight: "bold" }}>{props.title}</div>
          {brief && <div>{brief}</div>}
          <div>Author: {props.author}</div>
          <div>
            {categories?.map((item, i) => {
              return <Tag key={i}>{item}</Tag>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const DailyFreeSection = ({
  section_name,
  items,
  section_brief,
  ...props
}: any) => {
  console.log("DailyFreeSection", props);
  return (
    <Card title={section_name} style={{ width: "80%" }}>
      {section_brief}

      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {items?.map((item: any, i: any) => {
          return <Book key={item.uuid + String(i)} {...item} />;
        })}
      </div>
    </Card>
  );
};
const FeaturedBooksSection = ({
  section_name,
  items,
  section_brief,
  ...props
}: any) => {
  console.log("FeaturedBooksSection", props);
  return (
    <Card title={section_name} style={{ width: "80%" }}>
      {section_brief}

      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {items?.map((item: any, i: any) => {
          return <Book key={item.uuid + String(i)} {...item} />;
        })}
      </div>
    </Card>
  );
};
const CategorySection = ({
  section_name,
  items,
  section_brief,
  ...props
}: any) => {
  console.log("Category", props);
  return (
    <Card title={section_name} style={{ width: "80%" }}>
      {section_brief}

      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {items?.map((item: any, i: any) => {
          return <Book key={item.uuid + String(i)} {...item} />;
        })}
      </div>
    </Card>
  );
};
const PickForYouSection = ({
  section_name,
  items,
  section_brief,
  ...props
}: any) => {
  console.log("PickForYouSection", props);
  return (
    <Card title={section_name} style={{ width: "80%" }}>
      {section_brief}

      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {items?.map((item: any, i: any) => {
          return <Book key={item.uuid + String(i)} {...item} />;
        })}
      </div>
    </Card>
  );
};
const CollectionSection = ({
  section_name,
  items,
  section_brief,
  ...props
}: any) => {
  console.log("CollectionSection", props);
  return (
    <Card title={section_name} style={{ width: "80%" }}>
      {section_brief}

      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {items?.map((item: any, i: any) => {
          return <Book key={item.uuid + String(i)} {...item} />;
        })}
      </div>
    </Card>
  );
};
const BasicSection = ({
  section_name,
  items,
  section_brief,
  ...props
}: any) => {
  console.log("BasicSection", props);
  return (
    <Card title={section_name} style={{ width: "80%" }}>
      {section_brief}

      <div
        style={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {items?.map((item: any, i: any) => {
          return <Book key={item.uuid + String(i)} {...item} />;
        })}
      </div>
    </Card>
  );
};

// 根据不同的section_type  渲染每一个section
const ContentPage = ({ section }: { section: any }) => {
  switch (section.section_type) {
    case "daily_free":
      return (
        <DailyFreeSection key={section.section_readable_id} {...section} />
      );
    case "featured_books":
      return <FeaturedBooksSection key={section.section_id} {...section} />;
    case "category":
      return <CategorySection key={section.section_id} {...section} />;
    case "pick_for_you":
      return <PickForYouSection key={section.section_id} {...section} />;
    case "collection":
      return <CollectionSection key={section.section_id} {...section} />;
    default:
      return (
        <BasicSection
          key={section.section_id || section.section_readable_id}
          {...section}
        />
      );
  }
};

// 入口
function App() {
  const [data, setData] = useState<undefined | any[]>(undefined);
  const [loading, setLoading] = useState(false);

  // 请求api
  const fetchData = () => {
    setLoading(true);
    fetch("https://0pxv1i7w8c.execute-api.us-east-1.amazonaws.com/prod/browse")
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 0) {
          console.log("fetch data", res.data);
          setData(res.data);
        } else {
          setData(undefined);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
      }}
    >
      <Spin spinning={loading} fullscreen></Spin>
      {data?.map?.((section, i) => {
        return (
          <ContentPage key={section.section_id + String(i)} section={section} />
        );
      }) || (loading ? "loading" : "not found")}
    </div>
  );
}

export default App;
