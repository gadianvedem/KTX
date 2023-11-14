using SuatAn;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace KTX
{
    public partial class api : System.Web.UI.Page
    {
        void sinhvien(string action)
        {
            SqlServer db = new SqlServer();
            SqlCommand cm = db.GetCmd("SP_SinhVien", action);

            switch (action)
            {
                case "add_company":
                case "edit_company":

                    cm.Parameters.Add("@masv", SqlDbType.VarChar, 20).Value = Request["masv"];
                    cm.Parameters.Add("@hoten", SqlDbType.NVarChar, 20).Value = Request["hoten"];
                    cm.Parameters.Add("@ngaysinh", SqlDbType.Date).Value = Request["ngaysinh"];
                    cm.Parameters.Add("@gioitinh", SqlDbType.NVarChar, 5).Value = Request["gioitinh"];
                    cm.Parameters.Add("@sdt", SqlDbType.VarChar, 15).Value = Request["sdt"];
                    cm.Parameters.Add("@lop", SqlDbType.VarChar, 10).Value = Request["lop"];
                    cm.Parameters.Add("@khoa", SqlDbType.NVarChar, 20).Value = Request["khoa"];
                    break;
            }


            switch (action)
            {
                case "edit_company":
                case "delete_company":
                    // Add parameters for updating or deleting a book
                    cm.Parameters.Add("@masv", SqlDbType.VarChar, 20).Value = Request["Masv"];
                    break;
            }



            //thuc thi
            string json = (string)db.Scalar(cm);
            this.Response.Write(json);
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            string action = Request["action"];

            switch (action)
            {
                case "edit_company":
                    sinhvien(action);
                    break;
                case "add_company":
                    sinhvien(action);
                    break;
                case "list_company":
                    sinhvien(action);
                    break;

                case "delete_company":
                    sinhvien(action);
                    break;
            }
        }
    }
}