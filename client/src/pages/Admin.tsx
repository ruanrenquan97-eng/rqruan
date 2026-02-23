/**
 * Admin Dashboard - Mellpro Swiss Innovation Center
 * Manage news, products, applications, and contact submissions
 */

import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit2, Trash2, Eye, EyeOff, LayoutDashboard, FileText, Mail, Settings, Home, Package, Layers, Info, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import AddNewsModal from "@/components/AddNewsModal";
import ProductModal from "@/components/ProductModal";
import ApplicationModal from "@/components/ApplicationModal";
import AboutModal from "@/components/AboutModal";
import HomepageManagement from "@/components/admin/HomepageManagement";
import ProductSeriesModal from "@/components/ProductSeriesModal";
import TechnologyModal from "@/components/TechnologyModal";
// ... (keep headers)

export default function Admin() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/admin/:tab?");
  const activeTab = params?.tab || "overview";

  const navigateToTab = (tab: string) => {
    setLocation(`/admin/${tab}`);
  };

  const sidebarNavItems = [
    {
      label: "系统总览",
      path: "/admin/overview",
      icon: LayoutDashboard,
      isActive: (path: string) => path === "/admin/overview" || path === "/admin" || path === "/admin/"
    },
    {
      label: "首页管理",
      path: "/admin/homepage",
      icon: Home,
    },
    {
      label: "新闻动态",
      path: "/admin/news",
      icon: FileText,
    },
    {
      label: "产品中心",
      path: "/admin/products",
      icon: Package,
    },
    {
      label: "应用方案",
      path: "/admin/applications",
      icon: Layers,
    },
    {
      label: "技术管理",
      path: "/admin/technologies",
      icon: Lightbulb,
    },
    {
      label: "关于我们",
      path: "/admin/about",
      icon: Info,
    },
    {
      label: "邮件通知",
      path: "/admin/notifications",
      icon: Mail,
    },
    {
      label: "系统设置",
      path: "/admin/settings",
      icon: Settings,
    }
  ];

  /* ... queries ... */
  // ... (keep existing query/mutation definitions)
  const aboutQuery = trpc.about.listAll.useQuery();
  const aboutDeleteMutation = trpc.about.delete.useMutation({
    onSuccess: () => {
      toast.success("Content deleted successfully");
      aboutQuery.refetch();
    },
    onError: () => toast.error("Failed to delete content"),
  });

  const newsQuery = trpc.news.listAll.useQuery();
  const newsDeleteMutation = trpc.news.delete.useMutation({
    onSuccess: () => {
      toast.success("News deleted successfully");
      newsQuery.refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const productsQuery = trpc.products.listAll.useQuery();
  const productsDeleteMutation = trpc.products.delete.useMutation({
    onSuccess: () => {
      toast.success("Product deleted successfully");
      productsQuery.refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const applicationsQuery = trpc.applications.listAll.useQuery();
  const applicationsDeleteMutation = trpc.applications.delete.useMutation({
    onSuccess: () => {
      toast.success("Application deleted successfully");
      applicationsQuery.refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const contactsQuery = trpc.contacts.listAll.useQuery();
  const contactsDeleteMutation = trpc.contacts.delete.useMutation({
    onSuccess: () => {
      toast.success("Contact deleted successfully");
      contactsQuery.refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  // Additional state for modals (keep existing)
  const [addNewsOpen, setAddNewsOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | undefined>();
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | undefined>();
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [selectedAboutId, setSelectedAboutId] = useState<number | undefined>();
  const [selectedAboutData, setSelectedAboutData] = useState<any>(undefined);

  // Product Series State
  const [productSeriesModalOpen, setProductSeriesModalOpen] = useState(false);
  const [selectedSeriesId, setSelectedSeriesId] = useState<number | undefined>();
  const [selectedSeriesData, setSelectedSeriesData] = useState<any>(undefined);

  const productSeriesQuery = trpc.productSeries.listAll.useQuery();
  const productSeriesDeleteMutation = trpc.productSeries.delete.useMutation({
    onSuccess: () => {
      toast.success("Series deleted successfully");
      productSeriesQuery.refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  // Technology State
  const [technologyModalOpen, setTechnologyModalOpen] = useState(false);
  const [selectedTechnologyId, setSelectedTechnologyId] = useState<number | undefined>();
  const [selectedTechnologyData, setSelectedTechnologyData] = useState<any>(undefined);

  const technologiesQuery = trpc.technologies.listAll.useQuery();
  const technologiesDeleteMutation = trpc.technologies.delete.useMutation({
    onSuccess: () => {
      toast.success("Technology deleted successfully");
      technologiesQuery.refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  // Check if user is admin
  if (!user || user.role !== "admin") {
    // ... existing access denied ...
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout sidebarItems={sidebarNavItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <Tabs value={activeTab} className="w-full">
          {/* TabsList Removed - moved to sidebar */}

          {/* System Overview */}
          <TabsContent value="overview" className="space-y-6 mt-0">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{productsQuery.data?.length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">News Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{newsQuery.data?.length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{applicationsQuery.data?.length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contact Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contactsQuery.data?.length || 0}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              {/* Recent Activity */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Combine comments/products/news ideally, here just simple stacks */}
                    {(newsQuery.data?.slice(0, 3) || []).map(news => (
                      <div className="flex items-center" key={news.id}>
                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 font-bold">
                          N
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{news.title}</p>
                          <p className="text-xs text-muted-foreground">{news.category} · {new Date(news.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="ml-auto font-medium">News</div>
                      </div>
                    ))}
                    {(productsQuery.data?.slice(0, 3) || []).map(product => (
                      <div className="flex items-center" key={product.id}>
                        <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4 font-bold">
                          P
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.series} · {new Date(product.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="ml-auto font-medium">Product</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setAddNewsOpen(true)}>
                      <Plus className="h-6 w-6" />
                      Add News
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => {
                      setSelectedProductId(undefined);
                      setProductModalOpen(true);
                    }}>
                      <Plus className="h-6 w-6" />
                      Add Product
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => {
                      setSelectedApplicationId(undefined);
                      setApplicationModalOpen(true);
                    }}>
                      <Plus className="h-6 w-6" />
                      Add App
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => navigateToTab('notifications')}>
                      <div className="relative">
                        <Trash2 className="h-6 w-6 opacity-0" /> {/* Spacer */}
                        <span className="absolute inset-0 flex items-center justify-center">Inbox</span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Homepage Management */}
          <TabsContent value="homepage" className="space-y-6">
            <h2 className="text-xl font-semibold">Homepage Management</h2>
            <HomepageManagement />
          </TabsContent>

          {/* Add/Manage Content - Unwrapped */}

          {/* News Tab */}
          <TabsContent value="news" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage News</h2>
              <Button className="gap-2" onClick={() => setAddNewsOpen(true)}>
                <Plus size={16} />
                Add News
              </Button>
            </div>

            <AddNewsModal
              open={addNewsOpen}
              onOpenChange={setAddNewsOpen}
              onSuccess={() => newsQuery.refetch()}
            />

            {newsQuery.isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-2">
                {newsQuery.data?.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center p-4">
                        {/* Thumbnail Placeholder - in real app use item.image */}
                        <div className="h-16 w-16 bg-muted rounded flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-xs text-muted-foreground">Img</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                              {item.category}
                            </span>
                            <span className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => newsDeleteMutation.mutate({ id: item.id })}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>


          {/* Products Tab */}
          <TabsContent value="products" className="space-y-8">
            {/* Series Management Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Product Categories (Series)</h2>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => {
                  setSelectedSeriesId(undefined);
                  setSelectedSeriesData(undefined);
                  setProductSeriesModalOpen(true);
                }}>
                  <Plus size={16} />
                  Add Category
                </Button>
              </div>

              <ProductSeriesModal
                open={productSeriesModalOpen}
                onOpenChange={setProductSeriesModalOpen}
                seriesId={selectedSeriesId}
                initialData={selectedSeriesData}
                onSuccess={() => productSeriesQuery.refetch()}
              />

              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {productSeriesQuery.isLoading ? (
                  <div>Loading series...</div>
                ) : (
                  productSeriesQuery.data?.map((series) => (
                    <Card key={series.id} className="relative group">
                      <CardContent className="p-4">
                        <div className="font-semibold">{series.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{series.description || "No description"}</div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-background/80 rounded backdrop-blur-sm">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => {
                              setSelectedSeriesId(series.id);
                              setSelectedSeriesData(series);
                              setProductSeriesModalOpen(true);
                            }}
                          >
                            <Edit2 size={12} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-500 hover:text-red-600"
                            onClick={() => productSeriesDeleteMutation.mutate({ id: series.id })}
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            <div className="border-t pt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Products</h2>
                <Button className="gap-2" onClick={() => {
                  setSelectedProductId(undefined);
                  setProductModalOpen(true);
                }}>
                  <Plus size={16} />
                  Add Product
                </Button>
              </div>

              <ProductModal
                open={productModalOpen}
                onOpenChange={setProductModalOpen}
                productId={selectedProductId}
                onSuccess={() => productsQuery.refetch()}
              />

              {productsQuery.isLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="space-y-2">
                  {productsQuery.data?.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-0">
                        <div className="flex items-center p-4">
                          <div className="h-16 w-16 bg-muted rounded flex items-center justify-center mr-4 flex-shrink-0">
                            <span className="text-xs text-muted-foreground">Img</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                                {item.series}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedProductId(item.id);
                                setProductModalOpen(true);
                              }}
                            >
                              <Edit2 size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => productsDeleteMutation.mutate({ id: item.id })}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Applications</h2>
              <Button className="gap-2" onClick={() => {
                setSelectedApplicationId(undefined);
                setApplicationModalOpen(true);
              }}>
                <Plus size={16} />
                Add Application
              </Button>
            </div>

            <ApplicationModal
              open={applicationModalOpen}
              onOpenChange={setApplicationModalOpen}
              applicationId={selectedApplicationId}
              onSuccess={() => applicationsQuery.refetch()}
            />

            {applicationsQuery.isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-2">
                {applicationsQuery.data?.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-0">
                      <div className="flex items-center p-4">
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedApplicationId(item.id);
                              setApplicationModalOpen(true);
                            }}
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => applicationsDeleteMutation.mutate({ id: item.id })}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage About Page</h2>
              <Button className="gap-2" onClick={() => {
                setSelectedAboutId(undefined);
                setSelectedAboutData(undefined);
                setAboutModalOpen(true);
              }}>
                <Plus size={16} />
                Add Section
              </Button>
            </div>

            <AboutModal
              open={aboutModalOpen}
              onOpenChange={setAboutModalOpen}
              contentId={selectedAboutId}
              initialData={selectedAboutData}
              onSuccess={() => aboutQuery.refetch()}
            />

            {aboutQuery.isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-2">
                {aboutQuery.data?.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.section}</h3>
                          <p className="text-sm text-muted-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.published ? "Published" : "Draft"} · Order: {item.order}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedAboutId(item.id);
                              setSelectedAboutData(item);
                              setAboutModalOpen(true);
                            }}
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => aboutDeleteMutation.mutate({ id: item.id })}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Technologies Tab */}
          <TabsContent value="technologies" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Technologies</h2>
              <Button className="gap-2" onClick={() => {
                setSelectedTechnologyId(undefined);
                setSelectedTechnologyData(undefined);
                setTechnologyModalOpen(true);
              }}>
                <Plus size={16} />
                Add Technology
              </Button>
            </div>

            <TechnologyModal
              open={technologyModalOpen}
              onOpenChange={setTechnologyModalOpen}
              technologyId={selectedTechnologyId}
              initialData={selectedTechnologyData}
              onSuccess={() => technologiesQuery.refetch()}
            />

            {technologiesQuery.isLoading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-2">
                {technologiesQuery.data?.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description || "No description"}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.published ? "Published" : "Draft"} · /{item.slug}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedTechnologyId(item.id);
                              setSelectedTechnologyData(item);
                              setTechnologyModalOpen(true);
                            }}
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => technologiesDeleteMutation.mutate({ id: item.id })}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          {/* End Unwrapped Content */}

          {/* Email Notifications & Contacts */}
          <TabsContent value="notifications" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Settings Column */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <label
                        htmlFor="email-alerts"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Enable Email Alerts
                      </label>
                      <div className="h-6 w-11 rounded-full bg-slate-200 relative inline-flex items-center cursor-not-allowed opacity-50">
                        <span className="h-5 w-5 rounded-full bg-white transition translate-x-0.5"></span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="recipient" className="text-sm font-medium">Recipient Emails</label>
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="admin@mellpro.com"
                        disabled
                      />
                      <p className="text-[0.8rem] text-muted-foreground">Separate multiple emails with commas.</p>
                    </div>
                    <Button size="sm">Save Settings</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Inquiry List Column */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recent Inquiries</h3>
                {contactsQuery.isLoading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <div className="space-y-2 h-[500px] overflow-y-auto pr-2">
                    {contactsQuery.data?.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-sm">{item.name}</h3>
                                <p className="text-xs text-muted-foreground">{item.email}</p>
                              </div>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                {item.status || 'New'}
                              </span>
                            </div>
                            <p className="text-sm border-l-2 border-slate-200 pl-2 text-muted-foreground line-clamp-2">{item.message}</p>
                            <div className="flex gap-2 pt-2 justify-end">
                              <Button variant="ghost" size="sm" className="h-7 text-xs">Reply</Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => contactsDeleteMutation.mutate({ id: item.id })}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="settings" className="space-y-4">
            <h2 className="text-xl font-semibold">System Settings</h2>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Site Title</label>
                    <input className="flex h-10 w-full rounded-md border border-input px-3" defaultValue="Mellpro Swiss Innovation Center" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Site Description</label>
                    <textarea className="flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm" defaultValue="Leading innovation center in Switzerland..." />
                  </div>
                  <Button>Save General Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security & Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Two-Factor Authentication</label>
                      <p className="text-xs text-muted-foreground">Secure admin accounts with 2FA.</p>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-slate-200 relative inline-flex items-center cursor-not-allowed opacity-50">
                      <span className="h-5 w-5 rounded-full bg-white transition translate-x-0.5"></span>
                    </div>
                  </div>
                  <div className="grid gap-2 pt-2">
                    <label className="text-sm font-medium">Change Admin Password</label>
                    <input className="flex h-10 w-full rounded-md border border-input px-3" type="password" placeholder="New Password" />
                  </div>
                  <Button variant="outline">Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Database Backup</label>
                      <p className="text-xs text-muted-foreground">Last backup: Never</p>
                    </div>
                    <Button size="sm">Backup Now</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </DashboardLayout>
  );
}
